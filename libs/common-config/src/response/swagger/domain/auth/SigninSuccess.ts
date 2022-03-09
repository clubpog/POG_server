import { OkSuccess } from './../../common/OkSuccess';
import { ApiExtraModels, ApiProperty, PickType } from '@nestjs/swagger';

@ApiExtraModels()
export class SigninSuccess extends PickType(OkSuccess, [
  'statusCode',
] as const) {
  @ApiProperty({
    type: 'string',
    title: '성공 응답 값',
    description: '로그인 후 나오는 메시지입니다.',
    example: '로그인에 성공했습니다.',
  })
  message: string;

  @ApiProperty({
    type: 'object',
    title: '성공 응답 값',
    description: '로그인 후 다양한 API에 접근할 수 있는 AccessToken입니다.',
    example: {
      accessToken:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
    },
  })
  data: {
    accessToken: string;
  };
}
