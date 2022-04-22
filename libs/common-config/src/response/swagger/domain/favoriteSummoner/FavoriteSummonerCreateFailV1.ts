import { InternalServerError } from '@app/common-config/response/swagger/common/error/InternalServerError';
import { ApiExtraModels, ApiProperty, PickType } from '@nestjs/swagger';

@ApiExtraModels()
export class FavoriteSummonerCreateFailV1 extends PickType(
  InternalServerError,
  ['statusCode'] as const,
) {
  @ApiProperty({
    type: 'string',
    title: '실패 메시지',
    example: 'Internal Server Error',
    description: 'Internal Server Error',
  })
  message: string;

  @ApiProperty({
    type: 'string',
    title: '실패 메시지',
    example: 'Internal Server Error',
    description: 'Internal Server Error',
  })
  data: string;
}
