import { ApiExtraModels, ApiProperty, PickType } from '@nestjs/swagger';
import { OkSuccess } from '../../common/OkSuccess';

@ApiExtraModels()
export class FavoriteSummonerDeleteSuccess extends PickType(OkSuccess, [
  'statusCode',
  'data',
] as const) {
  @ApiProperty({
    type: 'string',
    title: '성공 메시지',
    example: '소환사 즐겨찾기 취소에 성공했습니다.',
    description: '소환사 즐겨찾기 취소에 성공했습니다.',
  })
  message: string;
}
