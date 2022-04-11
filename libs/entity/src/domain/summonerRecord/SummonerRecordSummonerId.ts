import { Expose } from 'class-transformer';

export class SummonerRecordSummonerId {
  @Expose({ name: 'summoner_id' })
  summonerId: string;

  static from(summonerId: string): SummonerRecordSummonerId {
    const dto = new SummonerRecordSummonerId();
    dto.summonerId = summonerId;
    return dto;
  }
}
