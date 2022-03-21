import { InternalServerError } from '@app/common-config/response/swagger/common/error/InternalServerError';
import { ApiExtraModels, ApiProperty, PickType } from '@nestjs/swagger';

@ApiExtraModels()
export class FavoriteSummonerDeleteFail extends PickType(InternalServerError, [
  'statusCode',
  'data',
] as const) {
  @ApiProperty({
    type: 'string',
    title: '실패 메시지',
    example: '소환사 즐겨찾기 취소에 실패했습니다.',
    description: '소환사 즐겨찾기 취소에 실패했습니다.',
  })
  message: string;
}
