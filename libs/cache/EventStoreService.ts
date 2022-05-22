import { ConfigService } from '../entity/config/configService';
import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';
import { Event, IEventStoreService } from './interface/integration';
import { FavoriteSummonerReq } from '../../apps/api/src/favoriteSummoner/dto/FavoriteSummonerReq.dto';
import { PushRiotApi } from '../../apps/push/src/push/dto/PushRiotApi';

@Injectable()
export class EventStoreServiceImplement implements IEventStoreService {
  private readonly master: Redis;

  constructor() {
    this.master = new Redis(ConfigService.redisClusterConfig()).on(
      'error',
      this.failToConnectRedis,
    );
  }
  async save(event: Event): Promise<void> {
    await this.master.set(event.data.id, JSON.stringify(event.data));
  }

  async set(key: string, value: string): Promise<void> {
    await this.master.set(key, value);
  }

  async sadd(key: string, value: string): Promise<void> {
    await this.master.sadd(key, value);
  }

  async smembers(key: string): Promise<string[]> {
    return await this.master.smembers(key);
  }

  async get(key: string): Promise<string | null> {
    return this.master
      .get(key)
      .then(result => result)
      .catch(() => null);
  }

  async saveRedisSummonerRecord(
    favoriteSummonerDto: FavoriteSummonerReq,
  ): Promise<void> {
    const redisClient = this.master;

    const [win, lose, tier, rank] = await this.summonerRecordMget(
      favoriteSummonerDto.summonerId,
    );

    if (!win)
      await redisClient.set(
        `summonerId:${favoriteSummonerDto.summonerId}:win`,
        favoriteSummonerDto.win,
      );

    if (!lose)
      await redisClient.set(
        `summonerId:${favoriteSummonerDto.summonerId}:lose`,
        favoriteSummonerDto.lose,
      );

    if (!tier)
      await redisClient.set(
        `summonerId:${favoriteSummonerDto.summonerId}:tier`,
        favoriteSummonerDto.tier,
      );

    if (!rank)
      await redisClient.set(
        `summonerId:${favoriteSummonerDto.summonerId}:rank`,
        favoriteSummonerDto.rank,
      );

    await redisClient.sadd('summonerId', favoriteSummonerDto.summonerId);
  }

  async removeTransactionRedis(summonerId: string): Promise<void> {
    const redisClient = this.master;

    await redisClient.multi({ pipeline: false });
    await redisClient.del(`summonerId:${summonerId}:win`);
    await redisClient.del(`summonerId:${summonerId}:lose`);
    await redisClient.del(`summonerId:${summonerId}:tier`);
    await redisClient.srem('summonerId', summonerId);
    await redisClient.exec();
  }

  async redisKeyErrorCheck(summonerId: string): Promise<boolean> {
    const redisClient = this.master;

    if (summonerId === 'error') {
      await redisClient.multi({ pipeline: false });

      await redisClient.del(`summonerId:${summonerId}:lose`);
      await redisClient.del(`summonerId:${summonerId}:tier`);
      await redisClient.del(`summonerId:${summonerId}:win`);
      await redisClient.srem('summonerId', 'error');

      await redisClient.exec();
      return true;
    }
  }

  async pushChangeRecord(
    riotApiResponse: PushRiotApi,
    summonerId: string,
  ): Promise<void> {
    const redisClient = this.master;
    try {
      await redisClient.mset(
        `summonerId:${summonerId}:win`,
        riotApiResponse[0].win,
        `summonerId:${summonerId}:lose`,
        riotApiResponse[0].lose,
        `summonerId:${summonerId}:tier`,
        riotApiResponse[0].tier,
      );
    } catch (error) {
      console.error(error);
    }
  }

  async unRankMset(summonerId: string): Promise<void> {
    const redisClient = this.master;
    await redisClient.mset(
      `summonerId:${summonerId}:win`,
      0,
      `summonerId:${summonerId}:lose`,
      0,
      `summonerId:${summonerId}:tier`,
      '언랭',
    );
  }
  async summonerRecordMget(summonerId: string): Promise<string[]> {
    const redisClient = this.master;
    return await redisClient.mget(
      `summonerId:${summonerId}:win`,
      `summonerId:${summonerId}:lose`,
      `summonerId:${summonerId}:tier`,
      `summonerId:${summonerId}:rank`,
    );
  }

  failToConnectRedis(error: Error): Promise<void> {
    console.error(error);
    process.exit(1);
  }
}
