import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsArray, IsNotEmpty } from 'class-validator';

export class FavoriteSummonerChangedTierReq {
  @ApiProperty({
    example: [
      'GDjFzPPZ3PiiAmPCblXDLv2yRh430fyVjWlpC8zAXaDp9o12bpOZCzfnsw',
      '8_MjoUjTvMvLLAHQj1PgSCV46Ux1hkGxOy2adI_s2OepAuremBy9ACAmKQ',
      'a_BJjxFEWpHDgppS0TAxf_PndfQBTHGwFW1mTnkG8L6t8fw',
      'AQuPJ-BiLJYNZta4y5c3Qf_HZ1qyTSyjiHv0IZzZAjL16E6L6q17gHH2Dg',
    ],
    description: '소환사 전적 갱신 조회 API를 위해 입력 받는 summonerId입니다.',
    required: true,
  })
  @Expose()
  @IsNotEmpty()
  @IsArray()
  summonerId: string[];
}
