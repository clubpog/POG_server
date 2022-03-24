import { FavoriteSummonerId } from '@app/entity/domain/favoriteSummoner/FavoriteSummonerId';
import { FavoriteSummonerApiQueryRepository } from '../../../../src/favoriteSummoner/FavoriteSummonerApiQueryRepository';

export class FavoriteSummonerApiQueryRepositoryStub extends FavoriteSummonerApiQueryRepository {
  private readonly favoriteSummonerLimitCount: number = 3;
  private readonly favoriteSummonerNonLimitCount: number = 1;

  constructor() {
    super();
  }

  override async countId(userId: number): Promise<number> {
    return userId === 1
      ? this.favoriteSummonerNonLimitCount
      : this.favoriteSummonerLimitCount;
  }

  override async findFavoriteSummonerWithSoftDelete(
    userId: number,
    summonerId: string,
  ): Promise<FavoriteSummonerId> {
    const dto = FavoriteSummonerId.from(1);
    return dto;
  }
}
