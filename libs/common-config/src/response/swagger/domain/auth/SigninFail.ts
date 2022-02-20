import { InternalServerError } from '../../common/error/InternalServerError';
import { ApiExtraModels, ApiProperty, PickType } from '@nestjs/swagger';

@ApiExtraModels()
export class SigninFail extends PickType(InternalServerError, [
  'statusCode',
  'data',
] as const) {
  @ApiProperty({
    type: 'string',
    title: 'Error 메시지',
    example: '로그인에 실패했습니다.',
    description: '로그인 로직이 실패했습니다.',
  })
  message: string;
}
