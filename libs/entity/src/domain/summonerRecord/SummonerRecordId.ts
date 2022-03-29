import { Expose } from 'class-transformer';

export class SummonerRecordId {
  @Expose({ name: 'id' })
  id: number;
}
