import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';

@ApiExtraModels()
export class NotFoundError {
  @ApiProperty({
    type: 'number',
    description: 'HTTP Error Code입니다.',
    example: 404,
  })
  statusCode: number;

  @ApiProperty({
    type: 'string',
    title: 'Error 메시지',
    example: '요청 값을 찾을 수 없습니다.',
    description: '요청 값을 찾을 수 없습니다.',
  })
  message: string;

  @ApiProperty({
    type: 'string',
    description: 'Error의 Data',
    example: '',
  })
  data: string;
}
