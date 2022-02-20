import { Expose } from 'class-transformer';

export class UserId {
  @Expose({ name: 'userId' })
  id: string;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}
}
