import { FavoriteSummonerId } from '@app/entity/domain/favoriteSummoner/FavoriteSummonerId';
import { FavoriteSummonerJoinSummonerRecord } from '@app/entity/domain/favoriteSummoner/FavoriteSummonerJoinSummonerRecord';
import { FavoriteSummonerApiQueryRepository } from '../../../../src/favoriteSummoner/FavoriteSummonerApiQueryRepository';
import { FavoriteSummonerRes } from '../../../../src/favoriteSummoner/dto/FavoriteSummonerRes.dto';

export class FavoriteSummonerApiQueryRepositoryStub extends FavoriteSummonerApiQueryRepository {
  private readonly favoriteSummonerLimitCount: number = 5;
  private readonly favoriteSummonerNonLimitCount: number = 1;
  private readonly notFindFavoriteSummonerId: number = 2;
  private readonly throwErrorFavoriteSummonerId: number = 3;
  private readonly nonUsedSummonerIdCount: number = 0;
  private readonly usedSummonerIdCount: number = 1;

  constructor() {
    super();
  }

  override async countId(userId: number): Promise<number> {
    if (userId === 3) {
      throw Error;
    }

    return userId === 1
      ? this.favoriteSummonerNonLimitCount
      : this.favoriteSummonerLimitCount;
  }

  override async countSummonerId(summonerId: string): Promise<number> {
    return summonerId === 'test'
      ? this.nonUsedSummonerIdCount
      : this.usedSummonerIdCount;
  }

  override async findFavoriteSummonerWithSoftDelete(
    userId: number,
    summonerId: string,
  ): Promise<FavoriteSummonerId> {
    const dto = FavoriteSummonerId.from(1);
    return dto;
  }

  override async findFavoriteSummonerId(
    userId: number,
    summonerId: string,
  ): Promise<FavoriteSummonerId> {
    if (userId === this.throwErrorFavoriteSummonerId) {
      throw Error;
    }
    if (userId === this.notFindFavoriteSummonerId) return;
    const dto = FavoriteSummonerId.from(1);
    return dto;
  }

  override async findAllFavoriteSummoners(
    userId: number,
  ): Promise<FavoriteSummonerRes[]> {
    if (userId === this.throwErrorFavoriteSummonerId) {
      throw Error;
    }
    const dto = [];
    dto.push(
      FavoriteSummonerJoinSummonerRecord.of(
        1,
        'test',
        'test',
        1,
        1,
        'test',
        'test',
        1,
        'test',
        1,
      ),
    );
    return dto.map(dto => new FavoriteSummonerRes(dto));
  }
}
