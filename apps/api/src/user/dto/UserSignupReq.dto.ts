import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class UserSignupReq {
  @Expose()
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @Expose()
  @IsNotEmpty()
  @IsString()
  lastName: string;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}
}
