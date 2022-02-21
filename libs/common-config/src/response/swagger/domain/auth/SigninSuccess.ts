import { OkSuccess } from './../../common/OkSuccess';
import { ApiExtraModels, ApiProperty, PickType } from '@nestjs/swagger';

@ApiExtraModels()
export class SigninSuccess extends PickType(OkSuccess, [
  'statusCode',
  'message',
] as const) {
  @ApiProperty({
    type: 'object',
    title: '성공 응답 값',
    description: '로그인 후 다양한 API에 접근할 수 있는 AccessToken입니다.',
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
  })
  data: {
    accessToken: string;
  };
}
