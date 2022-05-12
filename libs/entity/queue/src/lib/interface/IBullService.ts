import { Controller } from '@nestjs/common/interfaces';
import { TaskMetadata } from '../BullUtils';
/* eslint-disable @typescript-eslint/ban-types */

import Bull from 'bull';

export interface IBullService {
  registerTask(
    task: (job, done) => void,
    metadata: TaskMetadata,
    ctrl: Controller,
  );
  getQueues();
  getQueue(name: string): Bull.Queue;
  createJob(task: any, data: Object, opts?: Bull.JobOptions);
  getJob(jobId: Bull.JobId, queueName?: string): Promise<Bull.Job>;
}
