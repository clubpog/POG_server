import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue, Job } from 'bull';

@Injectable()
export class PushApiService {
  constructor(
    @InjectQueue('testQueue')
    private testQueue: Queue,
  ) {}

  async addMessageQueue(data: number): Promise<Job> {
    const job = await this.testQueue.add(
      'task',
      {
        dataId: data,
      },
      { delay: 3000 },
    );

    return job;
  }
}
