import { ConfigService } from '../entity/config/configService';
import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';
import { Event, IEventStoreService } from './interface/integration';
import { FavoriteSummonerReq } from '../../apps/api/src/favoriteSummoner/dto/FavoriteSummonerReq.dto';

@Injectable()
export class EventStoreTestServiceImplement implements IEventStoreService {
  private readonly master: Redis;

  constructor() {
    this.master = new Redis(ConfigService.redisTestConfig()).on(
      'error',
      this.failToConnectRedis,
    );
  }

  async save(event: Event): Promise<void> {
    await this.master.set(event.data.id, JSON.stringify(event.data));
  }

  async set(key: string, value: string): Promise<void> {
    await this.master.set(key, value, 'EX', 1);
  }

  async sadd(key: string, value: string): Promise<void> {
    throw new Error('Method not implemented.');
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

    const [win, lose, tier] = await redisClient.mget([
      `summonerId:${favoriteSummonerDto.summonerId}:win`,
      `summonerId:${favoriteSummonerDto.summonerId}:lose`,
      `summonerId:${favoriteSummonerDto.summonerId}:tier`,
    ]);

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

  private failToConnectRedis(error: Error): Promise<void> {
    console.error(error);
    process.exit(1);
  }
}
