import { SummonerRecord } from '@app/entity/domain/summonerRecord/SummonerRecord.entity';
import { FavoriteSummoner } from '@app/entity/domain/favoriteSummoner/FavoriteSummoner.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class FavoriteSummonerIdReq {
  @ApiProperty({
    example: 'Hide on bush',
    description: '즐겨찾기 API를 위해 입력 받는 name입니다.',
    required: true,
  })
  @Expose()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    example: 'CHALLENGER',
    description: '즐겨찾기 API를 위해 입력 받는 tier입니다.',
    required: true,
  })
  @Expose()
  @IsNotEmpty()
  @IsString()
  tier: string;

  @ApiProperty({
    example: 100,
    description: '즐겨찾기 API를 위해 입력 받는 win입니다.',
    required: true,
  })
  @Expose()
  @IsNotEmpty()
  @IsNumber()
  win: number;

  @ApiProperty({
    example: 100,
    description: '즐겨찾기 API를 위해 입력 받는 lose입니다.',
    required: true,
  })
  @Expose()
  @IsNotEmpty()
  @IsNumber()
  lose: number;

  @ApiProperty({
    example: '6',
    description: '즐겨찾기 API를 위해 입력 받는 profileIconId입니다.',
    required: true,
  })
  @Expose()
  @IsNotEmpty()
  @IsString()
  profileIconId: string;

  @ApiProperty({
    example:
      'abHOdi3PiSiMUH48LtAhMl-V1uxthjVEvPRTw8quWhsg70HuF6vT5UAfUsf3nLBvPgF90CLOV3NIow',
    description: '즐겨찾기 API를 위해 입력 받는 puuid입니다.',
    required: true,
  })
  @Expose()
  @IsNotEmpty()
  @IsString()
  puuid: string;

  @ApiProperty({
    example: 'Yr6IbOSrmcKdZ2EVfFW5RpeAS57WF8t6dFz_A2NncjVGrA',
    description: '즐겨찾기 API를 위해 입력 받는 summonerId입니다.',
    required: true,
  })
  @Expose()
  @IsNotEmpty()
  @IsString()
  summonerId: string;

  @ApiProperty({
    example: 564,
    description: '즐겨찾기 API를 위해 입력 받는 leaguePoint입니다.',
    required: true,
  })
  @Expose()
  @IsNotEmpty()
  @IsNumber()
  leaguePoint: number;

  @ApiProperty({
    example: 'I',
    description: '즐겨찾기 API를 위해 입력 받는 rank입니다.',
    required: true,
  })
  @Expose()
  @IsNotEmpty()
  @IsString()
  rank: string;

  toFavoriteSummonerEntity(userId: number): Promise<FavoriteSummoner> {
    return FavoriteSummoner.createFavoriteSummoner(userId, this.summonerId);
  }

  toSummonerRecordEntity(): Promise<SummonerRecord> {
    return SummonerRecord.createSummonerRecord(
      this.name,
      this.tier,
      this.win,
      this.lose,
      this.profileIconId,
      this.puuid,
      this.summonerId,
      this.leaguePoint,
      this.rank,
    );
  }
}
