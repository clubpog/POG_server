import { Expose } from 'class-transformer';

export class UserId {
  @Expose({ name: 'id' })
  id: number;

  constructor(id: number) {
    this.id = id;
  }
}
