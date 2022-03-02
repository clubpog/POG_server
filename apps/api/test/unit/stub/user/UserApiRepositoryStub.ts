import { UpdateResult } from '../../../../../../libs/entity/test/stub/UpdateResultStub';
import { UserApiRepository } from '../../../../src/user/UserApiRepository';

export class UserApiRepositoryStub extends UserApiRepository {
  constructor() {
    super();
  }
  override async updateLoggedAtByDeviceId(loggedAt: Date, deviceId: string) {
    await UpdateResult.updateLoggedAtByDeviceId();
    return;
  }

  override async updateFirebaseToken(firebaseToken: string, deviceId: string) {
    await UpdateResult.updateFirebaseToken();
    return;
  }
}
