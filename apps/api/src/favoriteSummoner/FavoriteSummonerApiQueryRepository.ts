import { SummonerRecord } from '@app/entity/domain/summonerRecord/SummonerRecord.entity';
import { FavoriteSummoner } from '@app/entity/domain/favoriteSummoner/FavoriteSummoner.entity';
import { FavoriteSummonerId } from '@app/entity/domain/favoriteSummoner/FavoriteSummonerId';
import { plainToInstance } from 'class-transformer';
import { createQueryBuilder, EntityRepository, Repository } from 'typeorm';
import { FavoriteSummonerJoinSummonerRecord } from '@app/entity/domain/favoriteSummoner/FavoriteSummonerJoinSummonerRecord';

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

  async findAllFavoriteSummoners(
    userId: number,
  ): Promise<FavoriteSummonerJoinSummonerRecord[]> {
    const row: SummonerRecord[] = await this.findAllJoinSummonerRecordByUserId(
      userId,
    );
    return plainToInstance(FavoriteSummonerJoinSummonerRecord, row);
  }

  private async findOneByUserAndSummonerId(userId: number, summonerId: string) {
    const queryBuilder = createQueryBuilder()
      .select(['id'])
      .from(FavoriteSummoner, 'favoriteSummoner')
      .where(`favoriteSummoner.user_id =:userId`, { userId })
      .andWhere(`favoriteSummoner.summoner_id =:summonerId`, { summonerId });

    return await queryBuilder.getRawOne();
  }

  private async findAllJoinSummonerRecordByUserId(userId: number) {
    const queryBuilder = createQueryBuilder()
      .select([
        'summonerRecord.id',
        'summonerRecord.name',
        'summonerRecord.tier',
        'summonerRecord.win',
        'summonerRecord.lose',
        'summonerRecord.profileIconId',
        'summonerRecord.puuid',
        'summonerRecord.summonerId',
        'summonerRecord.rank',
        'summonerRecord.leaguePoint',
      ])
      .from(FavoriteSummoner, 'favoriteSummoner')
      .innerJoin(
        SummonerRecord,
        'summonerRecord',
        'summonerRecord.summoner_id = favoriteSummoner.summoner_id',
      )
      .where(`favoriteSummoner.user_id =:userId`, { userId });

    return await queryBuilder.getRawMany();
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
