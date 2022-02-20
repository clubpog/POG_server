import { InternalServerError } from '../../common/error/InternalServerError';
import { ApiExtraModels, ApiProperty, PickType } from '@nestjs/swagger';

@ApiExtraModels()
export class fcmTokenUpdateFail extends PickType(InternalServerError, [
  'statusCode',
  'data',
] as const) {
  @ApiProperty({
    type: 'string',
    title: 'Error 메시지',
    example: 'FCM 토큰 수정에 실패했습니다.',
    description: 'FCM 토큰 수정에 실패했습니다.',
  })
  message: string;
}
