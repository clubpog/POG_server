import { ApiProperty } from '@nestjs/swagger';
import { User } from '@app/entity/domain/user/User.entity';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsBoolean, IsString } from 'class-validator';

export class UserUpdatePushReq {
  @ApiProperty({
    example: 'test',
    description: '푸시알림 허용 여부 변경을 위해 입력 받는 deviceId입니다.',
    required: true,
  })
  @Expose()
  @IsNotEmpty()
  @IsString()
  deviceId: string;

  @ApiProperty({
    example: true,
    description: '푸시알림 허용 여부 변경을 위해 입력 받는 isPush입니다.',
    required: true,
  })
  @Expose()
  @IsNotEmpty()
  @IsBoolean()
  isPush: boolean;

  toEntity(): Promise<User> {
    return User.updatePush(this.deviceId, this.isPush);
  }
}
