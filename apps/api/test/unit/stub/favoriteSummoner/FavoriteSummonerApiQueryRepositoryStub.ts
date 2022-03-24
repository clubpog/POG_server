import { FavoriteSummonerId } from '@app/entity/domain/favoriteSummoner/FavoriteSummonerId';
import { UpdateResult } from '../../../../../../libs/entity/test/stub/UpdateResultStub';
import { FavoriteSummonerApiQueryRepository } from '../../../../src/favoriteSummoner/FavoriteSummonerApiQueryRepository';

export class FavoriteSummonerApiQueryRepositoryStub extends FavoriteSummonerApiQueryRepository {
  constructor() {
    super();
  }

  override async countId(userId: number): Promise<number> {
    return userId === 1 ? 1 : 3;
  }

  override async findFavoriteSummonerWithSoftDelete(
    userId: number,
    summonerId: string,
  ): Promise<FavoriteSummonerId> {
    const dto = FavoriteSummonerId.from(1);
    return dto;
  }
}
