import { PushApiService } from './PushApiService';
import { PushJobService } from '../../../../libs/common-config/src/job/push/PushJobService';
import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';
import { plainToInstance } from 'class-transformer';
import { PushRiotApi } from './dto/PushRiotApi';
import { RiotApiJobService } from '@app/common-config/job/riot/RiotApiJobService';

@Processor('PushQueue')
export class PushApiConsumer {
  private readonly logger = new Logger(PushApiConsumer.name);

  constructor(
    private readonly pushJobService?: PushJobService,
    private readonly pushApiService?: PushApiService,
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
    const redisClient = await this.pushApiService.getRedisClient();
    const riotApiResponse = plainToInstance(
      PushRiotApi,
      await RiotApiJobService.riotLeagueApi(job.data['summonerId']),
    );

    if (!riotApiResponse) {
      await redisClient.mset(
        `summonerId:${job.data['summonerId']}:win`,
        0,
        `summonerId:${job.data['summonerId']}:lose`,
        0,
        `summonerId:${job.data['summonerId']}:tier`,
        '언랭',
      );
      return;
    }
    await this.pushApiService.changeRecord(
      riotApiResponse,
      redisClient,
      job.data['summonerId'],
    );

    await this.pushApiService.addRedisSet(redisClient, job.data['summonerId']);
    this.logger.log(`${job.data['summonerId']}를 Redis에 추가했습니다.`);
  }
}
