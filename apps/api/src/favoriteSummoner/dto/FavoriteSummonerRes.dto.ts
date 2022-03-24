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
  @Exclude() private readonly _profileIconId: number;
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

  @ApiProperty()
  @Expose()
  get name(): string {
    return this._name;
  }

  @ApiProperty()
  @Expose()
  get tier(): string {
    return this._tier;
  }

  @ApiProperty()
  @Expose()
  get win(): number {
    return this._win;
  }

  @ApiProperty()
  @Expose()
  get lose(): number {
    return this._lose;
  }

  @ApiProperty()
  @Expose()
  get puuid(): string {
    return this._puuid;
  }

  @ApiProperty()
  @Expose()
  get rank(): string {
    return this._rank;
  }

  @ApiProperty()
  @Expose()
  get profileIconId(): number {
    return this._profileIconId;
  }

  @ApiProperty()
  @Expose()
  get summonerId(): string {
    return this._summonerId;
  }

  @ApiProperty()
  @Expose()
  get leaguePoint(): number {
    return this._leaguePoint;
  }
}
