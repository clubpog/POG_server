import { PushApiTaskStub } from './../../stub/push/PushApiTaskStub';
import { IPushApiTask } from './../../../../src/push/interface/IPushApiTask';
import { BullServiceStub } from './../../../../../../libs/entity/queue/test/stub/BullServiceStub';
import { IBullService } from './../../../../../../libs/entity/queue/src/lib/interface/IBullService';
import { IRiotApiJobService } from './../../../../../../libs/common-config/src/job/riot/interface/IRiotApiJobService';
import { RiotApiJobServiceStub } from './../../../../../../libs/common-config/src/job/riot/test/stub/RiotApiJobServiceStub';
import { PushApiService } from './../../../../src/push/PushApiService';
import { RedisServiceStub } from '../../../../../../libs/entity/test/stub/RedisServiceStub';
import { IEventStoreService } from '../../../../../../libs/cache/interface/integration';
import { SummonerRecordApiQueryRepositoryStub } from '../../stub/summonerRecord/SummonerRecordApiQueryRepositoryStub';

describe('PushApiService', () => {
  let summonerRecordApiQueryRepository: SummonerRecordApiQueryRepositoryStub;
  let redisClient: IEventStoreService;
  let riotApiJobService: IRiotApiJobService;
  let bullService: IBullService;
  let tasks: IPushApiTask;

  it('Push Queue 검증', async () => {
    // given
    redisClient = new RedisServiceStub();
    summonerRecordApiQueryRepository =
      new SummonerRecordApiQueryRepositoryStub();
    riotApiJobService = new RiotApiJobServiceStub();
    bullService = new BullServiceStub();
    tasks = new PushApiTaskStub();

    const sut = new PushApiService(
      redisClient,
      summonerRecordApiQueryRepository,
      riotApiJobService,
      bullService,
      tasks,
    );

    // when
    const actual = await sut.addMessageQueue();

    // then
    expect(actual).toBeUndefined();
  });
});
