import { OkSuccess } from '@app/common-config/response/swagger/common/OkSuccess';
import { ApiExtraModels, ApiProperty, PickType } from '@nestjs/swagger';

@ApiExtraModels()
export class FcmTokenUpdateSuccess extends PickType(OkSuccess, [
  'statusCode',
  'data',
] as const) {
  @ApiProperty({
    type: 'string',
    title: '성공 메시지',
    example: 'FCM 토큰 수정에 성공했습니다.',
    description: 'FCM 토큰 수정에 성공했습니다.',
  })
  message: string;
}
