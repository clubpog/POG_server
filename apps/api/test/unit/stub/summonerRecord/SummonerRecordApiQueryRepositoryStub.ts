import { SummonerRecordId } from '@app/entity/domain/summonerRecord/SummonerRecordId';
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

  override async findSummonerRecordIdBySummonerId(
    summonerId: string,
  ): Promise<SummonerRecordId> {
    const dto = SummonerRecordId.from(1);
    return dto;
  }
}
