/* eslint-disable @typescript-eslint/ban-types */

import Bull from 'bull';

export interface IBullService {
  createJob(task: any, data: Object, opts?: Bull.JobOptions);
}
