import { Job, DoneCallback } from 'bull';
import { IPushApiTask } from './../../../../src/push/interface/IPushApiTask';
export class PushApiTaskStub implements IPushApiTask {
  addPushQueue(job: Job<any>, done: DoneCallback) {
    throw new Error('Method not implemented.');
  }
  addDefaultPushQueue(job: Job<any>, done: DoneCallback) {
    throw new Error('Method not implemented.');
  }
  addWinPushQueue(job: Job<any>, done: DoneCallback) {
    throw new Error('Method not implemented.');
  }
  addLosePushQueue(job: Job<any>, done: DoneCallback) {
    throw new Error('Method not implemented.');
  }
  recoverPushQueue(job: Job<any>, done: DoneCallback) {
    throw new Error('Method not implemented.');
  }
}
