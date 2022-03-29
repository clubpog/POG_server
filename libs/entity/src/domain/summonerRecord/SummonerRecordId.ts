import { Expose } from 'class-transformer';

export class SummonerRecordId {
  @Expose({ name: 'id' })
  id: number;

  static from(id: number): SummonerRecordId {
    const dto = new SummonerRecordId();
    dto.id = id;
    return dto;
  }
}
