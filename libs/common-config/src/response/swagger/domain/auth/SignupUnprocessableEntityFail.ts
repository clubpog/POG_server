import { UnprocessableEntityError } from './../../common/error/UnprocessableEntityError';
import { ApiExtraModels, ApiProperty, PickType } from '@nestjs/swagger';

@ApiExtraModels()
export class SignupUnprocessableEntityFail extends PickType(
  UnprocessableEntityError,
  ['statusCode'] as const,
) {
  @ApiProperty({
    type: 'string',
    title: 'Error 메시지',
    description: 'Unprocessable Entity',
    example: 'Unprocessable Entity',
  })
  message: string;

  @ApiProperty({
    type: 'string',
    title: 'Error 메시지',
    description: '이미 DB에 있는 deviceId를 입력했습니다.',
    example: '이미 DB에 있는 deviceId를 입력했습니다.',
  })
  data: string;
}
