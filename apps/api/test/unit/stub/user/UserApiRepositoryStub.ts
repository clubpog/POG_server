import { User } from '@app/entity/domain/user/User.entity';
import { UpdateResult } from '../../../../../../libs/entity/test/stub/UpdateResultStub';
import { UserApiRepository } from '../../../../src/user/UserApiRepository';

export class UserApiRepositoryStub extends UserApiRepository {
  private _savedUser: User;

  constructor() {
    super();
  }
  override async updateLoggedAtByDeviceId(loggedAt: Date, deviceId: string) {
    await UpdateResult.updateLoggedAtByDeviceId();
    return;
  }
}

// export class UserApiRepositoryStub {
//   private _savedUser: User;

//   constructor() {}
//   async updateLoggedAtByDeviceId(loggedAt: Date, deviceId: string) {
//     await UpdateResult.updateLoggedAtByDeviceId();
//     return;
//   }
// }
