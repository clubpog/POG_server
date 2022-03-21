import { Expose } from 'class-transformer';

export class FavoriteSummonerId {
  @Expose({ name: 'id' })
  id: number;

  constructor(id: number) {
    this.id = id;
  }
}
