import { Exclude, Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { ChangedTierPagination } from '@app/entity/domain/changedTier/ChangedTierPagination';
import { IFavoriteSummonerChangedTierReadSuccess } from '../../changedTier/interface/IChangedTierReadSuccess';

export class FavoriteSummonerChangedTierRes
  implements IFavoriteSummonerChangedTierReadSuccess
{
  @Exclude() private readonly _id: number;
  @Exclude() private readonly _matchId: string;
  @Exclude() private readonly _tier: string;
  @Exclude() private readonly _rank: string;
  @Exclude() private readonly _summonerId: string;
  @Exclude() private readonly _status: string;

  constructor(changedTier: ChangedTierPagination) {
    this._id = changedTier.id;
    this._matchId = changedTier.matchId;
    this._tier = changedTier.tier;
    this._rank = changedTier.rank;
    this._summonerId = changedTier.summonerId;
    this._status = changedTier.status;
  }

  @ApiProperty()
  @Expose()
  summonerId: [
    {
      id: string;
      match_id: string;
      tier: string;
      rank: string;
      summoner_id: string;
      status: string;
    },
  ];

  @ApiProperty()
  @Expose()
  get id(): number {
    return this._id;
  }

  @ApiProperty()
  @Expose()
  get match_id(): string {
    return this._matchId;
  }

  @ApiProperty()
  @Expose()
  get tier(): string {
    return this._tier;
  }

  @ApiProperty()
  @Expose()
  get rank(): string {
    return this._rank;
  }

  @ApiProperty()
  @Expose()
  get summoner_id(): string {
    return this._summonerId;
  }

  @ApiProperty()
  @Expose()
  get status(): string {
    return this._status;
  }
}
