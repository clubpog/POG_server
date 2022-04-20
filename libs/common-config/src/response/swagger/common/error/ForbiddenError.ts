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
    example: 'Forbidden',
    description: 'Forbidden',
  })
  message: any;

  @ApiProperty({
    type: 'string',
    description: '응답 데이터',
    example: '',
  })
  data: string;
}
