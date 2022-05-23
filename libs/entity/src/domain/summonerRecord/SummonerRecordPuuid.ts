import { Expose } from 'class-transformer';

export class SummonerRecordPuuid {
  @Expose({ name: 'puuid' })
  puuid: string;

  static from(puuid: string): SummonerRecordPuuid {
    const dto = new SummonerRecordPuuid();
    dto.puuid = puuid;
    return dto;
  }
}
