import { ForbiddenError } from '@app/common-config/response/swagger/common/error/ForbiddenError';
import { ApiExtraModels, ApiProperty, PickType } from '@nestjs/swagger';

@ApiExtraModels()
export class FavoriteSummonerCreateLimitFail extends PickType(ForbiddenError, [
  'statusCode',
  'data',
] as const) {
  @ApiProperty({
    type: 'string',
    title: '실패 메시지',
    example: '즐겨찾기 한도가 초과되었습니다.',
    description: '즐겨찾기 한도가 초과되었습니다.',
  })
  message: string;
}
