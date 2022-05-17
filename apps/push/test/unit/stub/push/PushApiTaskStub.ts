import { PushJobServiceStub } from '@app/common-config/job/push/test/stub/PushJobServiceStub';
import { IEventStoreService } from '../../../../../../libs/cache/interface/integration';
import { IPushApiTask } from './../../../../src/push/interface/IPushApiTask';
export class PushApiTaskStub implements IPushApiTask {
  constructor(
    private readonly redisClient?: IEventStoreService,
    private readonly pushJobService?: PushJobServiceStub,
  ) {}

  addPushQueue(task?, data?, opts?) {
    return this.pushJobService.send(data['summonerId'], data['summonerName']);
  }
  addWinPushQueue(task, data, opts?) {
    return this.pushJobService.winSummonerListSend(
      data['summonerId'],
      data['summonerName'],
    );
  }
  addLosePushQueue(task, data, opts?) {
    return this.pushJobService.loseSummonerListSend(
      data['summonerId'],
      data['summonerName'],
    );
  }

  addTierUpPushQueue(task, data, opts?) {
    return this.pushJobService.tierUpSummonerListSend(
      data['summonerId'],
      data['summonerName'],
    );
  }

  addTierDownPushQueue(task, data, opts?) {
    return this.pushJobService.tierDownSummonerListSend(
      data['summonerId'],
      data['summonerName'],
    );
  }

  recoverPushQueue(task, data, opts?): Promise<void> {
    return;
  }
}
