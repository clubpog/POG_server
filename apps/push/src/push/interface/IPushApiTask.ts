import Bull from 'bull';

export interface IPushApiTask {
  addPushQueue(job?: Bull.Job, done?: Bull.DoneCallback);
  addWinPushQueue(job?: Bull.Job, done?: Bull.DoneCallback);
  addLosePushQueue(job?: Bull.Job, done?: Bull.DoneCallback);
  recoverPushQueue(job?: Bull.Job, done?: Bull.DoneCallback);
}
