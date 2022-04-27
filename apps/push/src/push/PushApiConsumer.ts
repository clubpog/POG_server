import { PushJobService } from '../../../../libs/common-config/src/job/push/PushJobService';
import { Process, Processor } from '@nestjs/bull';
import { Inject, Logger } from '@nestjs/common';
import { Job } from 'bull';
import { plainToInstance } from 'class-transformer';
import { PushRiotApi } from './dto/PushRiotApi';
import { RiotApiJobService } from '@app/common-config/job/riot/RiotApiJobService';
import { IEventStoreService } from '../../../../libs/cache/interface/integration';
import { EInfrastructureInjectionToken } from '@app/common-config/enum/InfrastructureInjectionToken';

@Processor('PushQueue')
export class PushApiConsumer {
  private readonly logger = new Logger(PushApiConsumer.name);

  constructor(
    private readonly pushJobService?: PushJobService,
    @Inject(EInfrastructureInjectionToken.EVENT_STORE.name)
    private readonly redisClient?: IEventStoreService,
  ) {}

  @Process('summonerList')
  async getSummonerIdQueue(job: Job) {
    await this.pushJobService.send(
      job.data['summonerId'],
      job.data['summonerName'],
    );
    this.logger.log(
      `${job.data['summonerName']}의 ${job.data['summonerId']} topic 푸시를 전송했습니다.`,
    );
  }

  @Process('recoverList')
  async getRecoverQueue(job: Job) {
    const riotApiResponse = plainToInstance(
      PushRiotApi,
      await RiotApiJobService.riotLeagueApi(job.data['summonerId']),
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
  }
}
