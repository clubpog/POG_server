import { IPushApiTask } from './interface/IPushApiTask';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { Task } from '../../../../libs/entity/queue/src/lib/index';
import Bull from 'bull';
import { EInfrastructureInjectionToken } from '@app/common-config/enum/InfrastructureInjectionToken';
import { PushJobService } from '@app/common-config/job/push/PushJobService';
import { IEventStoreService } from '../../../../libs/cache/interface/integration';
import { plainToInstance } from 'class-transformer';
import { PushRiotApi } from './dto/PushRiotApi';
import { RiotApiJobService } from '@app/common-config/job/riot/RiotApiJobService';
import { EApplicationInjectionToken } from '@app/common-config/enum/ApplicationInjectionToken';

@Injectable()
export class PushApiTask implements IPushApiTask {
  private readonly logger = new Logger(PushApiTask.name);

  constructor(
    @Inject(EInfrastructureInjectionToken.EVENT_STORE.name)
    private readonly redisClient?: IEventStoreService,
    @Inject(EApplicationInjectionToken.PUSH_JOB.name)
    private readonly pushJobService?: PushJobService,
    @Inject(EApplicationInjectionToken.RIOT_API_JOB.name)
    private readonly riotApiJobService?: RiotApiJobService,
  ) {}

  @Task({ name: 'addPushQueue' })
  async addPushQueue(job: Bull.Job, done: Bull.DoneCallback): Promise<void> {
    await this.pushJobService.send(
      job.data['summonerId'],
      job.data['summonerName'],
    );
    this.logger.log(
      `${job.data['summonerName']}의 ${job.data['summonerId']} topic 푸시를 전송했습니다.`,
    );
    done(null);
  }

  @Task({ name: 'addDefaultPushQueue' })
  async addDefaultPushQueue(
    job: Bull.Job,
    done: Bull.DoneCallback,
  ): Promise<void> {
    await this.pushJobService.defaultSummonerListSend(
      job.data['summonerId'],
      job.data['summonerName'],
    );
    this.logger.log(
      `${job.data['summonerName']}의 ${job.data['summonerId']} topic 푸시를 전송했습니다.`,
    );
    done(null);
  }

  @Task({ name: 'addWinPushQueue' })
  async addWinPushQueue(job: Bull.Job, done: Bull.DoneCallback): Promise<void> {
    await this.pushJobService.winSummonerListSend(
      job.data['summonerId'],
      job.data['summonerName'],
    );
    this.logger.log(
      `${job.data['summonerName']}의 ${job.data['summonerId']} topic 푸시를 전송했습니다.`,
    );
    done(null);
  }

  @Task({ name: 'addLosePushQueue' })
  async addLosePushQueue(
    job: Bull.Job,
    done: Bull.DoneCallback,
  ): Promise<void> {
    await this.pushJobService.loseSummonerListSend(
      job.data['summonerId'],
      job.data['summonerName'],
    );
    this.logger.log(
      `${job.data['summonerName']}의 ${job.data['summonerId']} topic 푸시를 전송했습니다.`,
    );
    done(null);
  }

  @Task({ name: 'recoverPushQueue' })
  async recoverPushQueue(
    job: Bull.Job,
    done: Bull.DoneCallback,
  ): Promise<void> {
    const riotApiResponse = plainToInstance(
      PushRiotApi,
      await this.riotApiJobService.soloRankResult(job.data['summonerId']),
    );

    if (!riotApiResponse) {
      await this.redisClient.unRankMset(job.data['summonerId']);
      return;
    }

    await this.redisClient.pushChangeRecord(
      riotApiResponse,
      job.data['summonerId'],
    );

    await this.redisClient.sadd('summonerId', job.data['summonerId']);
    this.logger.log(`${job.data['summonerId']}를 Redis에 추가했습니다.`);
    done(null);
  }
}
