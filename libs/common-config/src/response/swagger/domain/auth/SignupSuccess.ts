import { ApiExtraModels, ApiProperty, PickType } from '@nestjs/swagger';
import { CreatedSuccess } from '@app/common-config/response/swagger/common/CreatedSuccess';

@ApiExtraModels()
export class SignupSuccess extends PickType(CreatedSuccess, [
  'statusCode',
  'data',
] as const) {
  @ApiProperty({
    type: 'string',
    title: '성공 응답 값',
    description: '회원 가입 후 나오는 메시지입니다.',
    example: '회원 가입에 성공했습니다.',
  })
  message: string;
}
