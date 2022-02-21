import { Expose } from 'class-transformer';

export class UserId {
  @Expose({ name: 'user_id' })
  userId: string;
}
