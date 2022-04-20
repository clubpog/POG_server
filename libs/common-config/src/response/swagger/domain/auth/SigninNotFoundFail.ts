import { NotFoundError } from '@app/common-config/response/swagger/common/error/NotFoundError';
import { ApiExtraModels, ApiProperty, PickType } from '@nestjs/swagger';

@ApiExtraModels()
export class SigninNotFoundFail extends PickType(NotFoundError, [
  'statusCode',
  'message',
] as const) {
  @ApiProperty({
    type: 'string',
    title: 'Error 메시지',
    example: '입력된 deviceId가 존재하지 않습니다.',
    description: '입력된 deviceId가 존재하지 않습니다.',
  })
  data: string;
}
