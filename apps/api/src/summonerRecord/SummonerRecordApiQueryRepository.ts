import { plainToInstance } from 'class-transformer';
import { SummonerRecord } from '@app/entity/domain/summonerRecord/SummonerRecord.entity';
import { createQueryBuilder, EntityRepository, Repository } from 'typeorm';
import { SummonerRecordId } from '@app/entity/domain/summonerRecord/SummonerRecordId';
import { SummonerRecordSummonerId } from '@app/entity/domain/summonerRecord/SummonerRecordSummonerId';

@EntityRepository(SummonerRecord)
export class SummonerRecordApiQueryRepository extends Repository<SummonerRecord> {
  async findSummonerRecordIdBySummonerId(
    summonerId: string,
  ): Promise<SummonerRecordId> {
    const row = await this.findOneBySummonerId(summonerId);
    return plainToInstance(SummonerRecordId, row);
  }

  async findSummonerRecordWithSoftDelete(
    summonerId: string,
  ): Promise<SummonerRecordId> {
    const row = await this.findOneSoftDelete(summonerId);
    return plainToInstance(SummonerRecordId, row);
  }

  async findAllSummonerRecordId(): Promise<SummonerRecordSummonerId[]> {
    const row = await this.findAllSummonerId();
    return plainToInstance(SummonerRecordSummonerId, row);
  }

  private async findOneBySummonerId(summonerId: string) {
    const queryBuilder = createQueryBuilder()
      .select(['id'])
      .from(SummonerRecord, 'summonerRecord')
      .where(`summonerRecord.summonerId =:summonerId`, { summonerId });
    return await queryBuilder.getRawOne();
  }

  private async findOneSoftDelete(summonerId: string) {
    const queryBuilder = createQueryBuilder()
      .select(['id'])
      .withDeleted()
      .from(SummonerRecord, 'summonerRecord')
      .where(`summonerRecord.summonerId =:summonerId`, { summonerId });
    return await queryBuilder.getRawOne();
  }

  private async findAllSummonerId() {
    const queryBuilder = createQueryBuilder()
      .select(['summoner_id'])
      .from(SummonerRecord, 'summonerRecord');

    return await queryBuilder.getRawMany();
  }
}
