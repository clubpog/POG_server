import { SummonerRecordId } from '@app/entity/domain/summonerRecord/SummonerRecordId';
import { SummonerRecordApiQueryRepository } from '../../../../src/summonerRecord/SummonerRecordApiQueryRepository';

export class SummonerRecordApiQueryRepositoryStub extends SummonerRecordApiQueryRepository {
  constructor() {
    super();
  }
  override async findSummonerRecordIdBySummonerId(
    summonerId: string,
  ): Promise<SummonerRecordId> {
    const dto = SummonerRecordId.from(1);
    return dto;
  }

  override async findSummonerRecordWithSoftDelete(
    summonerId: string,
  ): Promise<SummonerRecordId> {
    const dto = SummonerRecordId.from(1);
    return dto;
  }
}
