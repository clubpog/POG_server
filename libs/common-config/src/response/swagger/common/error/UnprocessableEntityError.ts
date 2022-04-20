import { ResponseStatus } from '@app/common-config/response/ResponseStatus';
import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';

@ApiExtraModels()
export class UnprocessableEntityError {
  @ApiProperty({
    type: 'number',
    description: 'HTTP Error Code입니다.',
    example: ResponseStatus.UNPROCESSABLE,
  })
  statusCode: number;

  @ApiProperty({
    type: 'string',
    title: 'Error 메시지',
    example: 'Unprocessable Entity',
    description: 'Unprocessable Entity',
  })
  message: string;

  @ApiProperty({
    type: 'string',
    description: '응답 데이터',
    example: '',
  })
  data: string;
}
