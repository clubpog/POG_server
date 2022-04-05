import { Redis } from 'ioredis';
import { PushRiotApi } from './dto/PushRiotApi';
import { plainToInstance } from 'class-transformer';
import { RiotApiJobs } from './../../../../libs/common-config/src/job/RiotApi';
import { RedisService } from 'nestjs-redis';
import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { Interval } from '@nestjs/schedule';

@Injectable()
export class PushApiService {
  constructor(
    @InjectQueue('PushQueue')
    private pushQueue: Queue,
    private readonly redisService: RedisService,
  ) {}

  @Interval('pushCronTask', 10000)
  async addMessageQueue(): Promise<void> {
    const redisClient: Redis = this.redisService.getClient();
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
        await this.addPushQueue();
        await this.changeRecord(riotApiResponse, redisClient, summonerId);
      }
    });
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

  private async addPushQueue() {
    await this.pushQueue.add(
      'summonerList',
      {
        dataId: 1,
      },
      { delay: 10000, removeOnComplete: true },
    );
  }

  private async changeRecord(
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
}
