import { User } from '@app/entity/domain/user/User.entity';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class AuthSignupReq {
  @Expose()
  @IsNotEmpty()
  @IsString()
  userId: string;

  @Expose()
  @IsNotEmpty()
  @IsString()
  password: string;

  @Expose()
  @IsNotEmpty()
  @IsString()
  deviceId: string;

  @Expose()
  @IsNotEmpty()
  @IsString()
  firebaseToken: string;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  toEntity(): Promise<User> {
    return User.signup(
      this.userId,
      this.password,
      this.deviceId,
      this.firebaseToken,
    );
  }
}
