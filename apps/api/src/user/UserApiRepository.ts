import { createQueryBuilder, EntityRepository, Repository } from 'typeorm';
import { User } from '@app/entity/domain/user/User.entity';

@EntityRepository(User)
export class UserApiRepository extends Repository<User> {
  async updateLoggedAtByDeviceId(loggedAt: Date, deviceId: string) {
    const queryBuilder = createQueryBuilder()
      .update(User)
      .set({ loggedAt })
      .where(`deviceId =:deviceId`, { deviceId });
    return await queryBuilder.execute();
  }

  async updateFirebaseToken(firebaseToken: string, deviceId: string) {
    const queryBuilder = createQueryBuilder()
      .update(User)
      .set({ firebaseToken })
      .where(`deviceId =:deviceId`, { deviceId });
    return await queryBuilder.execute();
  }

  async updatePush(deviceId: string, isPush: boolean) {
    const queryBuilder = createQueryBuilder()
      .update(User)
      .set({ isPush })
      .where(`deviceId =:deviceId`, { deviceId });
    return await queryBuilder.execute();
  }
}
