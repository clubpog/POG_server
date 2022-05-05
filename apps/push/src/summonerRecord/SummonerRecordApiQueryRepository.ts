import { plainToInstance } from 'class-transformer';
import { SummonerRecord } from '@app/entity/domain/summonerRecord/SummonerRecord.entity';
import { createQueryBuilder, EntityRepository, Repository } from 'typeorm';
import { SummonerRecordSummonerId } from '@app/entity/domain/summonerRecord/SummonerRecordSummonerId';

@EntityRepository(SummonerRecord)
export class SummonerRecordApiQueryRepository extends Repository<SummonerRecord> {
  async findAllSummonerRecordId(): Promise<SummonerRecordSummonerId[]> {
    const row = await this.findAllSummonerId();
    return plainToInstance(SummonerRecordSummonerId, row);
  }

  private async findAllSummonerId() {
    const queryBuilder = createQueryBuilder()
      .select(['summoner_id'])
      .from(SummonerRecord, 'summonerRecord');

    return await queryBuilder.getRawMany();
  }
}
