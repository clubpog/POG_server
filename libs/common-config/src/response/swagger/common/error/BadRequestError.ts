import { ResponseStatus } from '@app/common-config/response/ResponseStatus';
import { CustomValidationError } from '@app/common-config/filter/CustomValidationError';
import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';

@ApiExtraModels()
export class BadRequestError {
  @ApiProperty({
    type: 'number',
    description: 'HTTP Error Code입니다.',
    example: ResponseStatus.BAD_PARAMETER,
  })
  statusCode: number;

  @ApiProperty({
    type: 'array',
    title: 'Error 메시지',
    example: '요청 값에 문제가 있습니다.',
    description:
      'Request-Body의 각각 프로퍼티의 제약조건에 맞지 않은 값이 포함되어 있습니다. ' +
      '해당 예시에 나와 있는 오류중에 적어도 한 개의 조건에 맞지 않아 요청이 실패했습니다.',
  })
  message: any;

  @ApiProperty({
    type: [CustomValidationError],
    description: 'Error의 이름',
    example: CustomValidationError,
  })
  data: object;
}
