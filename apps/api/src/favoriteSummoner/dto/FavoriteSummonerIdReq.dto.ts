import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class FavoriteSummonerIdReq {
  @ApiProperty({
    example: 'Yr6IbOSrmcKdZ2EVfFW5RpeAS57WF8t6dFz_A2NncjVGrA',
    description: '즐겨찾기 API를 위해 입력 받는 summonerId입니다.',
    required: true,
  })
  @Expose()
  @IsNotEmpty()
  @IsString()
  summonerId: string;
}
