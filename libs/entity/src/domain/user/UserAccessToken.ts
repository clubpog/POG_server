import { Expose } from 'class-transformer';

export class UserAccessToken {
  @Expose({ name: 'accessToken' })
  accessToken: string;
}
