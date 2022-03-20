import { FavoriteSummoner } from '@app/entity/domain/favoriteSummoner/FavoriteSummoner.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class FavoriteSummonerIdReq {
  @ApiProperty({
    example: true,
    description: '즐겨찾기 API를 위해 입력 받는 summonerId입니다.',
    required: true,
  })
  @Expose()
  @IsNotEmpty()
  @IsString()
  summonerId: string;

  toEntity(userId: number): Promise<FavoriteSummoner> {
    return FavoriteSummoner.createFavoriteSummoner(userId, this.summonerId);
  }
}
