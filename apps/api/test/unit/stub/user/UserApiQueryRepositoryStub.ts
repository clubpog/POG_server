import { User } from '@app/entity/domain/user/User.entity';
import { UserId } from '@app/entity/domain/user/UserId';
import { UserApiQueryRepository } from '../../../../src/user/UserApiQueryRepository';

export class UserApiQueryRepositoryStub extends UserApiQueryRepository {
  constructor() {
    super();
  }

  override async findUserIdByDeviceId(deviceId): Promise<UserId> {
    if (deviceId === 'test1') {
      throw Error;
    }

    if (!deviceId) return;
    const row = await User.createId(deviceId);
    return new UserId(row.id);
  }
}
