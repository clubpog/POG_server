import { InjectQueue } from '@nestjs/bull';
import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Queue, Job } from 'bull';
import { Cache } from 'cache-manager';

@Injectable()
export class PushApiService {
  constructor(
    @InjectQueue('testQueue')
    private testQueue: Queue,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
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

  async cacheTest(): Promise<string> {
    const savedTime = await this.cacheManager.get<number>('time');
    if (savedTime) {
      return 'saved time : ' + savedTime;
    }
    const now = new Date().getTime();
    await this.cacheManager.set<number>('time', now);
    return 'save new time : ' + now;
  }
}
