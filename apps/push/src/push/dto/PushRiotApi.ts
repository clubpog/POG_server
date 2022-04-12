import { Exclude, Expose } from 'class-transformer';

export class PushRiotApi {
  @Exclude() leagueId: string;
  @Exclude() queueType: string;
  @Exclude() rank: string;
  @Exclude() summonerId: string;
  @Exclude() leaguePoints: number;
  @Exclude() veteran: boolean;
  @Exclude() freshBlood: boolean;
  @Exclude() hotStreak: boolean;
  @Exclude() inactive: boolean;

  @Expose({ name: 'wins' })
  win: number;

  @Expose({ name: 'losses' })
  lose: number;

  @Expose({ name: 'tier' })
  tier: string;

  @Expose({ name: 'summonerName' })
  summonerName: string;
}
