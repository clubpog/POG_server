import { ChangedTierPagination } from './../../../../libs/entity/src/domain/changedTier/ChangedTierPagination';
import { plainToInstance } from 'class-transformer';
import { createQueryBuilder, EntityRepository, Repository } from 'typeorm';
import { ChangedTier } from '@app/entity/domain/changedTier/ChangedTier.entity';

@EntityRepository(ChangedTier)
export class ChangedTierApiQueryRepository extends Repository<ChangedTier> {
  async findChangedTierByPagination(
    summonerId: string,
    offset: number,
    limit: number,
  ): Promise<ChangedTierPagination[]> {
    const changedTierArray: ChangedTierPagination[] = [];
    const rows: ChangedTier[] = await this.findAllChangedTier(
      summonerId,
      offset,
      limit,
    );
    rows.map(row =>
      changedTierArray.push(plainToInstance(ChangedTierPagination, row)),
    );
    return changedTierArray;
  }

  private async findAllChangedTier(
    summonerId: string,
    offset: number,
    limit: number,
  ) {
    const queryBuilder = createQueryBuilder()
      .select(['id', 'match_id', 'tier', 'rank', 'summoner_id', 'status'])
      .from(ChangedTier, 'changedTier')
      .where(`changedTier.summoner_id =:summonerId`, { summonerId })
      .orderBy('changedTier.created_at', 'DESC')
      .limit(limit)
      .offset(offset);

    return await queryBuilder.getRawMany();
  }
}
