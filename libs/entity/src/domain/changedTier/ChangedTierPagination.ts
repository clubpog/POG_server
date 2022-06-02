import { Expose } from 'class-transformer';

export class ChangedTierPagination {
  @Expose({ name: 'id' })
  id: number;

  @Expose({ name: 'match_id' })
  matchId: string;

  @Expose({ name: 'tier' })
  tier: string;

  @Expose({ name: 'rank' })
  rank: string;

  @Expose({ name: 'summoner_id' })
  summonerId: string;

  @Expose({ name: 'status' })
  status: string;
}
