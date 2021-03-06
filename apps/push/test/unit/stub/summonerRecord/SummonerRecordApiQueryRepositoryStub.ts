import { SummonerRecordPuuid } from '@app/entity/domain/summonerRecord/SummonerRecordPuuid';
import { SummonerRecordSummonerId } from '@app/entity/domain/summonerRecord/SummonerRecordSummonerId';
import { SummonerRecordApiQueryRepository } from '../../../../src/summonerRecord/SummonerRecordApiQueryRepository';

export class SummonerRecordApiQueryRepositoryStub extends SummonerRecordApiQueryRepository {
  constructor() {
    super();
  }
  override async findAllSummonerRecordId(): Promise<
    SummonerRecordSummonerId[]
  > {
    const dto = SummonerRecordSummonerId.from('test');
    return [dto];
  }
  override async findOnePuuidAtSummonerRecord(): Promise<SummonerRecordPuuid> {
    const dto = SummonerRecordPuuid.from('test');
    return dto;
  }
}
