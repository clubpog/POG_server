import { SummonerRecord } from '@app/entity/domain/summonerRecord/SummonerRecord.entity';
import { createQueryBuilder, EntityRepository, Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { SummonerRecordId } from '@app/entity/domain/summonerRecord/SummonerRecordId';

@EntityRepository(SummonerRecord)
export class SummonerRecordApiQueryRepository extends Repository<SummonerRecord> {
  async findSummonerRecordIdBySummonerId(
    summonerId: string,
  ): Promise<SummonerRecordId> {
    const row = await this.findOneBySummonerId(summonerId);
    return plainToInstance(SummonerRecordId, row);
  }

  private async findOneBySummonerId(summonerId: string) {
    const queryBuilder = createQueryBuilder()
      .select(['id'])
      .from(SummonerRecord, 'summonerRecord')
      .where(`summonerRecord.summonerId =:summonerId`, { summonerId });
    return await queryBuilder.getRawOne();
  }
}
