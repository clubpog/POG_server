import { SummonerRecord } from '@app/entity/domain/summonerRecord/SummonerRecord.entity';
import { createQueryBuilder, EntityRepository, Repository } from 'typeorm';

@EntityRepository(SummonerRecord)
export class SummonerRecordApiQueryRepository extends Repository<SummonerRecord> {
  async isSummonerRecordIdBySummonerId(summonerId: string): Promise<boolean> {
    const row = await this.findOneBySummonerId(summonerId);
    return row !== undefined ? true : false;
  }

  private async findOneBySummonerId(summonerId: string) {
    const queryBuilder = createQueryBuilder()
      .select(['id'])
      .from(SummonerRecord, 'summonerRecord')
      .where(`summonerRecord.summonerId =:summonerId`, { summonerId });
    return await queryBuilder.getRawOne();
  }
}
