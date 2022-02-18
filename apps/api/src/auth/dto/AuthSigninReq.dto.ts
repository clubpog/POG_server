import { ApiProperty } from '@nestjs/swagger';
import { User } from '@app/entity/domain/user/User.entity';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class AuthSigninReq {
  @ApiProperty({
    example: 'test',
    description: '로그인시 입력 받는 deviceId입니다.',
    required: true,
  })
  @Expose()
  @IsNotEmpty()
  @IsString()
  deviceId: string;

  @ApiProperty({
    example: 'test',
    description: '로그인시 입력 받는 firebaseToken입니다.',
    required: true,
  })
  @Expose()
  @IsNotEmpty()
  @IsString()
  firebaseToken: string;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  toEntity(): Promise<User> {
    return User.signin(this.deviceId);
  }
}
