import { CreatedSuccess } from '@app/common-config/response/swagger/common/CreatedSuccess';
import { ApiExtraModels, ApiProperty, PickType } from '@nestjs/swagger';

@ApiExtraModels()
export class FavoriteSummonerCreateSuccess extends PickType(CreatedSuccess, [
  'statusCode',
  'data',
] as const) {
  @ApiProperty({
    type: 'string',
    title: '성공 메시지',
    example: '소환사 즐겨찾기 추가에 성공했습니다.',
    description: '소환사 즐겨찾기 추가에 성공했습니다.',
  })
  message: string;
}
