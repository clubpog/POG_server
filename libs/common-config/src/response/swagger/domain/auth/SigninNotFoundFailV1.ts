import { NotFoundError } from '@app/common-config/response/swagger/common/error/NotFoundError';
import { ApiExtraModels, ApiProperty, PickType } from '@nestjs/swagger';

@ApiExtraModels()
export class SigninNotFoundFailV1 extends PickType(NotFoundError, [
  'statusCode',
] as const) {
  @ApiProperty({
    type: 'string',
    title: 'Error 메시지',
    example: '입력된 deviceId가 존재하지 않습니다.',
    description: '입력된 deviceId가 존재하지 않습니다.',
  })
  data: string;

  @ApiProperty({
    type: 'string',
    title: 'Error 메시지',
    example: 'Not Found',
    description: '입력된 deviceId가 존재하지 않습니다.',
  })
  message: string;
}
