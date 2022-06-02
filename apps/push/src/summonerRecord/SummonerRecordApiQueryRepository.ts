import { plainToInstance } from 'class-transformer';
import { SummonerRecord } from '@app/entity/domain/summonerRecord/SummonerRecord.entity';
import { createQueryBuilder, EntityRepository, Repository } from 'typeorm';
import { SummonerRecordSummonerId } from '@app/entity/domain/summonerRecord/SummonerRecordSummonerId';
import { SummonerRecordPuuid } from '@app/entity/domain/summonerRecord/SummonerRecordPuuid';

@EntityRepository(SummonerRecord)
export class SummonerRecordApiQueryRepository extends Repository<SummonerRecord> {
  async findAllSummonerRecordId(): Promise<SummonerRecordSummonerId[]> {
    const row = await this.findAllSummonerId();
    return plainToInstance(SummonerRecordSummonerId, row);
  }

  async findOnePuuidAtSummonerRecord(
    summonerId: string,
  ): Promise<SummonerRecordPuuid> {
    const row = await this.findOnePuuidBySummonerId(summonerId);
    return plainToInstance(SummonerRecordPuuid, row);
  }

  private async findAllSummonerId() {
    const queryBuilder = createQueryBuilder()
      .select(['summoner_id'])
      .from(SummonerRecord, 'summonerRecord');

    return await queryBuilder.getRawMany();
  }

  private async findOnePuuidBySummonerId(summonerId: string) {
    const queryBuilder = createQueryBuilder()
      .select(['puuid'])
      .from(SummonerRecord, 'summonerRecord')
      .where(`summonerRecord.summonerId =:summonerId`, { summonerId });

    return await queryBuilder.getRawOne();
  }
}
