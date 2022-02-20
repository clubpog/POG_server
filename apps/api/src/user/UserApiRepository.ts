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
}
