import { UpdateResult } from '../../../../../../libs/entity/test/stub/UpdateResultStub';
import { UserApiRepository } from '../../../../src/user/UserApiRepository';

export class UserApiRepositoryStub extends UserApiRepository {
  constructor() {
    super();
  }
  override async updateLoggedAtByDeviceId(loggedAt: Date, deviceId: string) {
    await UpdateResult.Result();
    return;
  }

  override async updateFirebaseToken(firebaseToken: string, deviceId: string) {
    await UpdateResult.Result();
    return;
  }

  override async updatePush(deviceId: string, isPush: boolean) {
    if (deviceId === 'test1') {
      throw Error;
    }

    await UpdateResult.Result();
    return;
  }
}
