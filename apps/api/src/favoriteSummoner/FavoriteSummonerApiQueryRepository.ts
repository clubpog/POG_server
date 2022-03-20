import { FavoriteSummoner } from '@app/entity/domain/favoriteSummoner/FavoriteSummoner.entity';
import { FavoriteSummonerId } from '@app/entity/domain/favoriteSummoner/FavoriteSummonerId';
import { plainToInstance } from 'class-transformer';
import { createQueryBuilder, EntityRepository, Repository } from 'typeorm';

@EntityRepository(FavoriteSummoner)
export class FavoriteSummonerApiQueryRepository extends Repository<FavoriteSummoner> {
  async findFavoriteSummonerWithSoftDelete(
    userId: number,
    summonerId: string,
  ): Promise<FavoriteSummonerId> {
    const row = await this.findOneSoftDelete(userId, summonerId);
    return plainToInstance(FavoriteSummonerId, row);
  }

  async countId(userId: number): Promise<number> {
    const row = await this.countIdByUserId(userId);
    return Number(row[0]['count']);
  }

  async findFavoriteSummonerId(
    userId: number,
    summonerId: string,
  ): Promise<FavoriteSummonerId> {
    const row = await this.findOneByUserAndSummonerId(userId, summonerId);
    return plainToInstance(FavoriteSummonerId, row);
  }

  private async findOneByUserAndSummonerId(userId: number, summonerId: string) {
    const queryBuilder = createQueryBuilder()
      .select(['id'])
      .from(FavoriteSummoner, 'favoriteSummoner')
      .where(`favoriteSummoner.user_id =:userId`, { userId })
      .andWhere(`favoriteSummoner.summoner_id =:summonerId`, { summonerId });

    return await queryBuilder.getRawOne();
  }

  private async findOneSoftDelete(userId: number, summonerId: string) {
    const queryBuilder = createQueryBuilder()
      .select(['id'])
      .withDeleted()
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
