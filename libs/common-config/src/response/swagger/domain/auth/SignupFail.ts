import { InternalServerError } from '../../common/error/InternalServerError';
import { ApiExtraModels, ApiProperty, PickType } from '@nestjs/swagger';

@ApiExtraModels()
export class SignupFail extends PickType(InternalServerError, [
  'statusCode',
  'data',
] as const) {
  @ApiProperty({
    type: 'string',
    title: 'Error 메시지',
    example: '회원 가입에 실패했습니다.',
    description: '회원 가입 로직이 실패했습니다.',
  })
  message: string;
}
