import { FavoriteSummoner } from '@app/entity/domain/favoriteSummoner/FavoriteSummoner.entity';
import { UpdateResult } from '../../../../../../libs/entity/test/stub/UpdateResultStub';

export class FavoriteSummonerRepositoryStub {
  private static database = new Map<number, FavoriteSummoner>();
  private _favoriteSummoner: FavoriteSummoner;

  constructor() {
    FavoriteSummonerRepositoryStub.database.set(1, new FavoriteSummoner());
  }

  save(favoriteSummoner: FavoriteSummoner): FavoriteSummoner | object {
    FavoriteSummonerRepositoryStub.database.set(
      favoriteSummoner.id,
      favoriteSummoner,
    );
    if (!this._favoriteSummoner) {
      this._favoriteSummoner = favoriteSummoner;
      return this._favoriteSummoner;
    } else {
      return { severity: 'ERROR', code: '23505' };
    }
  }

  softDelete() {
    return UpdateResult.Result();
  }

  restore() {
    return UpdateResult.Result();
  }
}
