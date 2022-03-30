import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';

@Processor('testQueue')
export class PushApiConsumer {
  private readonly logger = new Logger(PushApiConsumer.name);

  @Process('task')
  getMessageQueue(job: Job) {
    this.logger.log(`${job.id} 번 작업을 수신했습니다.`);
  }
}
