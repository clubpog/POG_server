import { OkSuccess } from './../../common/OkSuccess';
import { ApiExtraModels, ApiProperty, PickType } from '@nestjs/swagger';

@ApiExtraModels()
export class SigninSuccess extends PickType(OkSuccess, [
  'statusCode',
  'message',
] as const) {
  @ApiProperty({
    type: 'string',
    title: '성공 응답 값',
    example: '95',
    description: '로그인에 성공했습니다.',
  })
  data: string;
}
