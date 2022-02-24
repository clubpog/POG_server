import { OkSuccess } from '@app/common-config/response/swagger/common/OkSuccess';
import { ApiExtraModels, ApiProperty, PickType } from '@nestjs/swagger';

@ApiExtraModels()
export class PushUpdateSuccess extends PickType(OkSuccess, [
  'statusCode',
  'data',
] as const) {
  @ApiProperty({
    type: 'string',
    title: '성공 메시지',
    example: '푸시알림 허용 여부 수정에 성공했습니다.',
    description: '푸시알림 허용 여부 수정에 성공했습니다.',
  })
  message: string;
}
