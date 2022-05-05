import { FavoriteSummoner } from '@app/entity/domain/favoriteSummoner/FavoriteSummoner.entity';

export class ManagerStub {
  private static database = new Map<number, FavoriteSummoner>();
  private _favoriteSummoner: FavoriteSummoner;

  constructor() {
    ManagerStub.database.set(1, new FavoriteSummoner());
  }
  restore(targetOrEntity, criteria) {
    return;
  }

  save(favoriteSummoner: FavoriteSummoner): FavoriteSummoner | object {
    ManagerStub.database.set(favoriteSummoner.id, favoriteSummoner);
    if (!this._favoriteSummoner) {
      this._favoriteSummoner = favoriteSummoner;
      return this._favoriteSummoner;
    } else {
      return { severity: 'ERROR', code: '23505' };
    }
  }
}
