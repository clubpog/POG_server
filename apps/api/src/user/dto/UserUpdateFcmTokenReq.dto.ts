import { ApiProperty } from '@nestjs/swagger';
import { User } from '@app/entity/domain/user/User.entity';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class UserUpdateFcmTokenReq {
  @ApiProperty({
    example: 'test',
    description: 'FCM 토큰 수정시 입력 받는 firebaseToken입니다.',
    required: true,
  })
  @Expose()
  @IsNotEmpty()
  @IsString()
  firebaseToken: string;
}
