import { ApiProperty } from '@nestjs/swagger';
import { User } from '@app/entity/domain/user/User.entity';
import { Expose } from 'class-transformer';
import { IsBoolean, IsNotEmpty, IsString, Matches } from 'class-validator';

export class AuthSignupReq {
  // @ApiProperty({
  //   example: 'test',
  //   description: '회원 가입시 입력 받는 아이디입니다.',
  //   required: true,
  // })
  // @Expose()
  // @IsNotEmpty()
  // @IsString()
  // userId: string;

  // @ApiProperty({
  //   example: 'Test123!',
  //   description:
  //     '회원 가입시 입력 받는 비밀번호입니다. 하나 이상의 소문자, 대문자, 숫자 및 특수 문자를 포함하는 8~20자 비밀번호를 입력하세요',
  //   required: true,
  // })
  // @Expose()
  // @IsNotEmpty()
  // @IsString()
  // @Matches(
  //   /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,20}$/,
  //   {
  //     message:
  //       '하나 이상의 소문자, 대문자, 숫자 및 특수 문자를 포함하는 8~20자 비밀번호를 입력하세요',
  //   },
  // )
  // password: string;

  @ApiProperty({
    example: 'test',
    description: '회원 가입시 입력 받는 deviceId입니다.',
    required: true,
  })
  @Expose()
  @IsNotEmpty()
  @IsString()
  deviceId: string;

  @ApiProperty({
    example: 'test',
    description: '회원 가입시 입력 받는 firebaseToken입니다.',
    required: true,
  })
  @Expose()
  @IsNotEmpty()
  @IsString()
  firebaseToken: string;

  @ApiProperty({
    example: true,
    description: '회원 가입시 입력 받는 isPush입니다.',
    required: true,
  })
  @Expose()
  @IsNotEmpty()
  @IsBoolean()
  isPush: boolean;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  toEntity(): Promise<User> {
    return User.signup(
      // this.userId,
      // this.password,
      this.deviceId,
      this.firebaseToken,
    );
  }
}
