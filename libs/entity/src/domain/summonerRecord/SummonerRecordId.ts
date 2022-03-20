import { Expose } from 'class-transformer';

export class SummonerRecordId {
  @Expose({ name: 'id' })
  id: number;

  constructor(id: number) {
    this.id = id;
  }
}
