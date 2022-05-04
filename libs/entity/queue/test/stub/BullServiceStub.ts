import { PushApiTaskStub } from './../../../../../apps/push/test/unit/stub/push/PushApiTaskStub';
/* eslint-disable @typescript-eslint/ban-types */
import { Queue, JobId, Job } from 'bull';
import { TaskMetadata } from '../../src/lib';
import { IBullService } from '../../src/lib/interface/IBullService';

export class BullServiceStub implements IBullService {
  constructor(private readonly pushApiTask: PushApiTaskStub) {}
  registerTask(
    task: (job: any, done: any) => void,
    metadata: TaskMetadata,
    ctrl: object,
  ): void {
    throw new Error('Method not implemented.');
  }
  getQueues() {
    throw new Error('Method not implemented.');
  }
  getQueue(name: string): Queue<any> {
    throw new Error('Method not implemented.');
  }
  getJob(jobId: JobId, queueName?: string): Promise<Job<any>> {
    throw new Error('Method not implemented.');
  }
  public async createJob(task: any, data: Object, opts?: any) {
    return await this.pushApiTask[task.name](task, data, opts);
  }
}
