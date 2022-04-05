import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';

@Processor('PushQueue')
export class PushApiConsumer {
  private readonly logger = new Logger(PushApiConsumer.name);

  @Process('summonerList')
  getSummonerIdQueue(job: Job) {
    this.logger.log(`${job.id} 번 작업을 수신했습니다.`);
  }
}
