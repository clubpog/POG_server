import { Expose } from 'class-transformer';

export class FavoriteSummonerJoinSummonerRecord {
  @Expose({ name: 'summonerRecord_id' })
  id: number;

  @Expose({ name: 'summonerRecord_name' })
  name: string;

  @Expose({ name: 'summonerRecord_tier' })
  tier: string;

  @Expose({ name: 'summonerRecord_win' })
  win: number;

  @Expose({ name: 'summonerRecord_lose' })
  lose: number;

  @Expose({ name: 'summonerRecord_puuid' })
  puuid: string;

  @Expose({ name: 'summonerRecord_rank' })
  rank: string;

  @Expose({ name: 'summonerRecord_profile_icon_id' })
  profileIconId: string;

  @Expose({ name: 'summonerRecord_summoner_id' })
  summonerId: string;

  @Expose({ name: 'summonerRecord_league_point' })
  leaguePoint: number;
}
