import { PushJobServiceStub } from './../../../../../../libs/common-config/src/job/push/test/stub/PushJobServiceStub';
import { PushApiTaskStub } from './../../stub/push/PushApiTaskStub';
import { BullServiceStub } from './../../../../../../libs/entity/queue/test/stub/BullServiceStub';
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
  let bullService;
  let tasks: PushApiTaskStub;
  let spy: PushJobServiceStub;

  it('Push Queue 검증 (메시지 템플릿 테스트 구현 예정)', async () => {
    // given
    redisClient = new RedisServiceStub();
    summonerRecordApiQueryRepository =
      new SummonerRecordApiQueryRepositoryStub();
    riotApiJobService = new RiotApiJobServiceStub();
    spy = new PushJobServiceStub();
    tasks = new PushApiTaskStub(redisClient, spy);
    bullService = new BullServiceStub(tasks);

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
