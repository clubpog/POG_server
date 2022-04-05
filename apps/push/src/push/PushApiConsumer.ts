import { PushJobService } from './../../../../libs/common-config/src/job/src/PushJobService';
import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';

@Processor('PushQueue')
export class PushApiConsumer {
  private readonly logger = new Logger(PushApiConsumer.name);

  constructor(private readonly pushJobService: PushJobService) {}

  @Process('summonerList')
  async getSummonerIdQueue(job: Job) {
    await this.pushJobService.send(job.data['summonerId']);
    this.logger.log(`${job.data['summonerId']} topic 푸시를 전송했습니다.`);
  }
}
