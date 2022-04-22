import { ForbiddenError } from '@app/common-config/response/swagger/common/error/ForbiddenError';
import { ApiExtraModels, ApiProperty, PickType } from '@nestjs/swagger';

@ApiExtraModels()
export class FavoriteSummonerCreateLimitFailV1 extends PickType(
  ForbiddenError,
  ['statusCode'] as const,
) {
  @ApiProperty({
    type: 'string',
    title: '실패 메시지',
    example: 'Forbidden',
    description: 'Forbidden',
  })
  message: string;

  @ApiProperty({
    type: 'string',
    title: '실패 메시지',
    example: '즐겨찾기 한도가 초과되었습니다.',
    description: '즐겨찾기 한도가 초과되었습니다.',
  })
  data: string;
}
