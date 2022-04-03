import { User } from '@app/entity/domain/user/User.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsBoolean } from 'class-validator';

export class UserUpdatePushReq {
  @ApiProperty({
    example: true,
    description: '푸시알림 허용 여부 변경을 위해 입력 받는 isPush입니다.',
    required: true,
  })
  @Expose()
  @IsNotEmpty()
  @IsBoolean()
  isPush: boolean;

  toEntity(deviceId: string): Promise<User> {
    return User.updatePush(deviceId, this.isPush);
  }
}
