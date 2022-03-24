import { SummonerRecordApiQueryRepository } from '../../../../src/summonerRecord/SummonerRecordApiQueryRepository';

export class SummonerRecordApiQueryRepositoryStub extends SummonerRecordApiQueryRepository {
  constructor() {
    super();
  }

  override async isSummonerRecordIdBySummonerId(
    summonerId: string,
  ): Promise<boolean> {
    return true;
  }
}
