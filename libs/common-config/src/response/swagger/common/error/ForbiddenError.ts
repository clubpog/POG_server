import { ResponseStatus } from '@app/common-config/response/ResponseStatus';
import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';

@ApiExtraModels()
export class ForbiddenError {
  @ApiProperty({
    type: 'number',
    description: 'HTTP Error Code입니다.',
    example: ResponseStatus.FORBIDDEN,
  })
  statusCode: number;

  @ApiProperty({
    type: 'array',
    title: 'Error 메시지',
    example: '요청 값에 문제가 있습니다.',
    description: '접근을 거부합니다.',
  })
  message: any;

  @ApiProperty({
    type: 'string',
    description: '응답 데이터',
    example: '',
  })
  data: string;
}
