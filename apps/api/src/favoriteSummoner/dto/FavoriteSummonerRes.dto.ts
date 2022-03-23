import { Exclude, Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { FavoriteSummonerJoinSummonerRecord } from '@app/entity/domain/favoriteSummoner/FavoriteSummonerJoinSummonerRecord';

export class FavoriteSummonerRes {
  @Exclude() private readonly _id: number;
  @Exclude() private readonly _name: string;
  @Exclude() private readonly _tier: string;
  @Exclude() private readonly _win: number;
  @Exclude() private readonly _lose: number;
  @Exclude() private readonly _puuid: string;
  @Exclude() private readonly _rank: string;
  @Exclude() private readonly _profileIconId: string;
  @Exclude() private readonly _summonerId: string;
  @Exclude() private readonly _leaguePoint: number;

  constructor(summonerRecord: FavoriteSummonerJoinSummonerRecord) {
    this._id = summonerRecord.id;
    this._name = summonerRecord.name;
    this._tier = summonerRecord.tier;
    this._win = summonerRecord.win;
    this._lose = summonerRecord.lose;
    this._puuid = summonerRecord.puuid;
    this._rank = summonerRecord.rank;
    this._profileIconId = summonerRecord.profileIconId;
    this._summonerId = summonerRecord.summonerId;
    this._leaguePoint = summonerRecord.leaguePoint;
  }

  @ApiProperty()
  @Expose()
  get id(): number {
    return this._id;
  }

  @Expose()
  get name(): string {
    return this._name;
  }

  @Expose()
  get tier(): string {
    return this._tier;
  }

  @Expose()
  get win(): number {
    return this._win;
  }

  @Expose()
  get lose(): number {
    return this._lose;
  }

  @Expose()
  get puuid(): string {
    return this._puuid;
  }

  @Expose()
  get rank(): string {
    return this._rank;
  }

  @Expose()
  get profileIconId(): string {
    return this._profileIconId;
  }

  @Expose()
  get summonerId(): string {
    return this._summonerId;
  }

  @Expose()
  get leaguePoint(): number {
    return this._leaguePoint;
  }
}
