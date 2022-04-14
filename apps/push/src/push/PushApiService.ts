import { RiotApiJobService } from './../../../../libs/common-config/src/job/riot/RiotApiJobService';
import { PushRiotApi } from './dto/PushRiotApi';
import { plainToInstance } from 'class-transformer';
import { InjectQueue } from '@nestjs/bull';
import { Inject, Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { Interval, Timeout } from '@nestjs/schedule';
import { SummonerRecordApiQueryRepository } from '../../../api/src/summonerRecord/SummonerRecordApiQueryRepository';

import Redis from 'ioredis';
import { PushApiInjectionToken } from './PushApiInjectionToken';

@Injectable()
export class PushApiService {
  constructor(
    @InjectQueue('PushQueue')
    private pushQueue: Queue,
    @Inject(PushApiInjectionToken.EVENT_STORE)
    private readonly redisClient?: Redis,
    private readonly summonerRecordApiQueryRepository?: SummonerRecordApiQueryRepository,
  ) {}
  @Interval('pushCronTask', 180000)
  async addMessageQueue(): Promise<void> {
    const redisClient: Redis = await this.getRedisClient();
    const summonerIds = await redisClient.smembers('summonerId');

    summonerIds.map(async summonerId => {
      const isKeyError = await this.redisKeyErrorCheck(summonerId, redisClient);
      if (isKeyError) return;

      const soloRankResult = await RiotApiJobService.riotLeagueApi(summonerId);
      if (!soloRankResult) return;

      const riotApiResponse = plainToInstance(PushRiotApi, soloRankResult);

      const redisResponse = await redisClient.mget(
        `summonerId:${summonerId}:win`,
        `summonerId:${summonerId}:lose`,
        `summonerId:${summonerId}:tier`,
      );
      const isChangeRecord = await this.compareRecord(
        riotApiResponse,
        redisResponse,
      );

      if (isChangeRecord) {
        await this.addPushQueue(summonerId, riotApiResponse[0].summonerName);
        await this.changeRecord(riotApiResponse, redisClient, summonerId);
      }
    });
  }

  async recoverRedis(): Promise<void> {
    const summonerIds =
      await this.summonerRecordApiQueryRepository.findAllSummonerRecordId();

    await Promise.all(
      summonerIds.map(async summonerId => {
        await this.recoverRedisQueue(summonerId.summonerId);
      }),
    );
  }

  public async getRedisClient(): Promise<Redis> {
    return this.redisClient['master'];
  }

  private async redisKeyErrorCheck(
    summonerId: string,
    redisClient: Redis,
  ): Promise<boolean> {
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

  private async compareRecord(
    riotApiResponse: PushRiotApi,
    redisResponse: string[],
  ): Promise<boolean> {
    const [win, lose, tier] = redisResponse;
    if (riotApiResponse.tier !== tier) return true;
    if (riotApiResponse.win !== Number(win)) return true;
    if (riotApiResponse.lose !== Number(lose)) return true;
  }

  private async addPushQueue(summonerId: string, summonerName: string) {
    return await this.pushQueue.add(
      'summonerList',
      {
        summonerId,
        summonerName,
      },
      { delay: 10000, removeOnComplete: true },
    );
  }

  private async recoverRedisQueue(summonerId: string) {
    return await this.pushQueue.add(
      'recoverList',
      {
        summonerId,
      },
      { delay: 10000, removeOnComplete: true },
    );
  }

  public async changeRecord(
    riotApiResponse: PushRiotApi,
    redisClient: Redis,
    summonerId: string,
  ) {
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

  public async addRedisSet(
    redisClient: Redis,
    summonerId: string,
  ): Promise<void> {
    await redisClient.sadd('summonerId', summonerId);
  }
}
