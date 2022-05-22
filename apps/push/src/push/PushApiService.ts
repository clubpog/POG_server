import { EApplicationInjectionToken } from '@app/common-config/enum/ApplicationInjectionToken';
import { IRiotApiJobService } from './../../../../libs/common-config/src/job/riot/interface/IRiotApiJobService';
import { IEventStoreService } from '../../../../libs/cache/interface/integration';
import { PushRiotApi } from './dto/PushRiotApi';
import { Inject, Injectable } from '@nestjs/common';
import Bull from 'bull';
import { Interval, Timeout } from '@nestjs/schedule';

import { EInfrastructureInjectionToken } from '@app/common-config/enum/InfrastructureInjectionToken';
import { SummonerRecordApiQueryRepository } from '../summonerRecord/SummonerRecordApiQueryRepository';
import { BullService } from '../../../../libs/entity/queue/src/lib/BullService';

import { IPushApiTask } from './interface/IPushApiTask';

@Injectable()
export class PushApiService {
  constructor(
    @Inject(EInfrastructureInjectionToken.EVENT_STORE.name)
    private readonly redisClient?: IEventStoreService,
    private readonly summonerRecordApiQueryRepository?: SummonerRecordApiQueryRepository,
    @Inject(EApplicationInjectionToken.RIOT_API_JOB.name)
    private readonly riotApiJobService?: IRiotApiJobService,
    private readonly bullService?: BullService,
    @Inject(EApplicationInjectionToken.PUSH_API_TASK.name)
    private readonly tasks?: IPushApiTask,
  ) {}
  @Interval('pushCronTask', 180000)
  async addMessageQueue(): Promise<void> {
    const summonerIds = await this.redisClient.smembers('summonerId');

    summonerIds.map(async summonerId => {
      const isKeyError = await this.redisClient.redisKeyErrorCheck(summonerId);
      if (isKeyError) return;

      const riotApiResponse = await this.riotApiJobService.soloRankResult(
        summonerId,
      );
      if (!riotApiResponse) return;

      const redisResponse = await this.redisClient.summonerRecordMget(
        summonerId,
      );

      const isChangeRecord = await this.compareRecord(
        riotApiResponse,
        redisResponse,
      );

      if (isChangeRecord) {
        // AB 테스트 완료되면 주석 제거
        await this.addWinOrLoseQueue(
          await this.checkWinOrLose(riotApiResponse, redisResponse),
          summonerId,
          riotApiResponse[0].summonerName,
        );
        // await this.addPushQueue(summonerId, riotApiResponse[0].summonerName);

        await this.redisClient.pushChangeRecord(riotApiResponse, summonerId);
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

  private async addWinOrLoseQueue(
    checkWinOrLose: string,
    summonerId: string,
    summonerName: string,
  ): Promise<Bull.Job<any>> {
    if (checkWinOrLose === 'win') {
      return await this.addWinPushQueue(summonerId, summonerName);
    }
    if (checkWinOrLose === 'lose') {
      return await this.addLosePushQueue(summonerId, summonerName);
    }
    if (checkWinOrLose === 'tierUp' || checkWinOrLose === 'rankUp') {
      return await this.addTierUpPushQueue(summonerId, summonerName);
    }
    if (checkWinOrLose === 'tierDown' || checkWinOrLose === 'rankDown') {
      return await this.addTierDownPushQueue(summonerId, summonerName);
    }
    return;
  }

  private async checkWinOrLose(
    riotApiResponse: PushRiotApi,
    redisResponse: string[],
  ): Promise<string> {
    const [win, lose, tier, rank] = redisResponse;

    if (riotApiResponse[0].win !== Number(win)) {
      if (riotApiResponse[0].tier !== tier) {
        return 'tierUp';
      }
      if (riotApiResponse[0].rank !== rank) {
        return 'rankUp';
      }
      return 'win';
    }
    if (riotApiResponse[0].lose !== Number(lose)) {
      if (riotApiResponse[0].tier !== tier) {
        return 'tierDown';
      }
      if (riotApiResponse[0].rank !== rank) {
        return 'rankDown';
      }
      return 'lose';
    }
  }

  private async compareRecord(
    riotApiResponse: PushRiotApi,
    redisResponse: string[],
  ): Promise<boolean> {
    const [win, lose, tier, rank] = redisResponse;
    if (riotApiResponse[0].rank !== rank) return true;
    if (riotApiResponse[0].tier !== tier) return true;
    if (riotApiResponse[0].win !== Number(win)) return true;
    if (riotApiResponse[0].lose !== Number(lose)) return true;
  }

  private async addPushQueue(summonerId: string, summonerName: string) {
    return await this.bullService.createJob(
      this.tasks.addPushQueue,
      {
        summonerId,
        summonerName,
      },
      { delay: 10000, removeOnComplete: true },
    );
  }

  private async addWinPushQueue(summonerId: string, summonerName: string) {
    return await this.bullService.createJob(
      this.tasks.addWinPushQueue,
      {
        summonerId,
        summonerName,
      },
      { delay: 10000, removeOnComplete: true },
    );
  }
  private async addLosePushQueue(summonerId: string, summonerName: string) {
    return await this.bullService.createJob(
      this.tasks.addLosePushQueue,
      {
        summonerId,
        summonerName,
      },
      { delay: 10000, removeOnComplete: true },
    );
  }

  private async addTierUpPushQueue(summonerId: string, summonerName: string) {
    return await this.bullService.createJob(
      this.tasks.addTierUpPushQueue,
      {
        summonerId,
        summonerName,
      },
      { delay: 10000, removeOnComplete: true },
    );
  }

  private async addTierDownPushQueue(summonerId: string, summonerName: string) {
    return await this.bullService.createJob(
      this.tasks.addTierDownPushQueue,
      {
        summonerId,
        summonerName,
      },
      { delay: 10000, removeOnComplete: true },
    );
  }

  private async recoverRedisQueue(summonerId: string) {
    return await this.bullService.createJob(
      this.tasks.recoverPushQueue,
      {
        summonerId,
      },
      { delay: 10000, removeOnComplete: true },
    );
  }
}
