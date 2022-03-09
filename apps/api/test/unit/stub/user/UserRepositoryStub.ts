import { User } from '@app/entity/domain/user/User.entity';

export class UserRepositoryStub {
  private static database = new Map<number, User>();
  private _user: User;

  constructor() {
    UserRepositoryStub.database.set(1, new User());
  }

  save(user: User): User | object {
    UserRepositoryStub.database.set(user.id, user);
    if (!this._user) {
      this._user = user;
      return this._user;
    } else {
      return { severity: 'ERROR', code: '23505' };
    }
  }
}
