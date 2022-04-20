import { ResponseStatus } from '@app/common-config/response/ResponseStatus';
import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';

@ApiExtraModels()
export class NotFoundError {
  @ApiProperty({
    type: 'number',
    description: 'HTTP Error Code입니다.',
    example: ResponseStatus.NOT_FOUND,
  })
  statusCode: number;

  @ApiProperty({
    type: 'string',
    title: 'Error 메시지',
    example: 'Not Found',
    description: 'Not Found',
  })
  message: string;

  @ApiProperty({
    type: 'string',
    description: 'Error의 Data',
    example: '',
  })
  data: string;
}
