import { InternalServerError } from '@app/common-config/response/swagger/common/error/InternalServerError';
import { ApiExtraModels, ApiProperty, PickType } from '@nestjs/swagger';

@ApiExtraModels()
export class FavoriteSummonerDeleteFailV1 extends PickType(
  InternalServerError,
  ['statusCode'] as const,
) {
  @ApiProperty({
    type: 'string',
    title: '실패 메시지',
    example: 'Internal Server Error',
    description: '소환사 즐겨찾기 취소에 실패했습니다.',
  })
  message: string;

  @ApiProperty({
    type: 'string',
    title: '실패 메시지',
    example: 'Internal Server Error',
    description: '소환사 즐겨찾기 취소에 실패했습니다.',
  })
  data: string;
}
