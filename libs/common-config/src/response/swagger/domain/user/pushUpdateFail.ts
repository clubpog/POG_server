import { InternalServerError } from '../../common/error/InternalServerError';
import { ApiExtraModels, ApiProperty, PickType } from '@nestjs/swagger';

@ApiExtraModels()
export class pushUpdateFail extends PickType(InternalServerError, [
  'statusCode',
  'data',
] as const) {
  @ApiProperty({
    type: 'string',
    title: 'Error 메시지',
    example: '푸시알림 허용 여부 수정에 실패했습니다.',
    description: '푸시알림 허용 여부 수정에 실패했습니다.',
  })
  message: string;
}
