import { User } from '@app/entity/domain/user/User.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UserReq {
  @ApiProperty({
    example: 123,
    description: '토큰에서 얻어오는 userId입니다.',
    required: true,
  })
  @Expose()
  @IsNotEmpty()
  @IsString()
  userId: number;

  @ApiProperty({
    example: 'deviceId',
    description: '토큰에서 얻어오는 deviceId입니다.',
    required: true,
  })
  @Expose()
  @IsNotEmpty()
  @IsString()
  deviceId: string;

  @ApiProperty({
    example: 123,
    description: '토큰에서 얻어오는 iat입니다.',
    required: false,
  })
  @Expose()
  @IsNumber()
  iat?: string;

  @ApiProperty({
    example: 123,
    description: '토큰에서 얻어오는 exp입니다.',
    required: false,
  })
  @Expose()
  @IsNumber()
  exp?: string;

  toEntity(): Promise<User> {
    return User.jwtUserReq(this.deviceId, this.userId);
  }
}
