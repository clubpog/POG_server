import { Expose } from 'class-transformer';

export class FavoriteSummonerId {
  @Expose({ name: 'id' })
  id: number;

  static from(id: number): FavoriteSummonerId {
    const dto = new FavoriteSummonerId();
    dto.id = id;
    return dto;
  }
}
