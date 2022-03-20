import { FavoriteSummoner } from '@app/entity/domain/favoriteSummoner/FavoriteSummoner.entity';
import { createQueryBuilder, EntityRepository, Repository } from 'typeorm';

@EntityRepository(FavoriteSummoner)
export class FavoriteSummonerApiQueryRepository extends Repository<FavoriteSummoner> {
  async isFavoriteSummoner(
    userId: number,
    summonerId: string,
  ): Promise<boolean> {
    const row = await this.findOneByUserAndSummonerId(userId, summonerId);
    return row !== undefined ? true : false;
  }

  async countId(userId: number): Promise<number> {
    const row = await this.countIdByUserId(userId);
    return Number(row[0]['count']);
  }

  private async findOneByUserAndSummonerId(userId: number, summonerId: string) {
    const queryBuilder = createQueryBuilder()
      .select(['id'])
      .from(FavoriteSummoner, 'favoriteSummoner')
      .where(`favoriteSummoner.user_id =:userId`, { userId })
      .andWhere(`favoriteSummoner.summoner_id =:summonerId`, { summonerId });

    return await queryBuilder.getRawOne();
  }

  private async countIdByUserId(userId: number) {
    const queryBuilder = createQueryBuilder()
      .select('COUNT(id)')
      .from(FavoriteSummoner, 'favoriteSummoner')
      .where(`favoriteSummoner.user_id =:userId`, { userId });

    return await queryBuilder.getRawMany();
  }
}
