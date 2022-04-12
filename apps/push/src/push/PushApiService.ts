import { PushRiotApi } from './dto/PushRiotApi';
import { plainToInstance } from 'class-transformer';
import { RiotApiJobs } from './../../../../libs/common-config/src/job/RiotApi';
import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { Interval } from '@nestjs/schedule';
import { SummonerRecordApiQueryRepository } from '../../../api/src/summonerRecord/SummonerRecordApiQueryRepository';
import { RedisModuleConfig } from 'libs/entity/config/redisConfig';

import Redis from 'ioredis';

@Injectable()
export class PushApiService {
  constructor(
    @InjectQueue('PushQueue')
    private pushQueue: Queue,
    private readonly summonerRecordApiQueryRepository?: SummonerRecordApiQueryRepository,
  ) {}
  @Interval('pushCronTask', 180000)
  async addMessageQueue(): Promise<void> {
    const redisClient: Redis = await this.getRedisClient();
    const summonerIds = await redisClient.smembers('summonerId');

    summonerIds.map(async summonerId => {
      const riotApiResponse = plainToInstance(
        PushRiotApi,
        await RiotApiJobs(summonerId),
      );
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
        await this.addPushQueue(summonerId, riotApiResponse.summonerName);
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
    return new Redis(RedisModuleConfig);
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
    await redisClient.mset(
      `summonerId:${summonerId}:win`,
      riotApiResponse.win,
      `summonerId:${summonerId}:lose`,
      riotApiResponse.lose,
      `summonerId:${summonerId}:tier`,
      riotApiResponse.tier,
    );
  }

  public async addRedisSet(redisClient: Redis, summonerId: string) {
    await redisClient.sadd('summonerId', summonerId);
  }
}
