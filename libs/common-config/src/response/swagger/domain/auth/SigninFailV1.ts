import { InternalServerError } from '../../common/error/InternalServerError';
import { ApiExtraModels, ApiProperty, PickType } from '@nestjs/swagger';

@ApiExtraModels()
export class SigninFailV1 extends PickType(InternalServerError, [
  'statusCode',
] as const) {
  @ApiProperty({
    type: 'string',
    title: 'Error 메시지',
    example: 'Internal Server Error',
    description: '로그인 로직이 실패했습니다.',
  })
  message: string;

  @ApiProperty({
    type: 'string',
    title: 'Error 메시지',
    example: 'Internal Server Error',
    description: '로그인 로직이 실패했습니다.',
  })
  data: string;
}
