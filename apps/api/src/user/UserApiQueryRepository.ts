import { createQueryBuilder, EntityRepository, Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { User } from '@app/entity/domain/user/User.entity';
import { UserId } from '@app/entity/domain/user/UserId';

@EntityRepository(User)
export class UserApiQueryRepository extends Repository<User> {
  async findUserIdByDeviceId(deviceId: string): Promise<UserId> {
    const row = await this.findOneByDeviceId(deviceId);
    return plainToInstance(UserId, row);
  }

  private async findOneByDeviceId(deviceId: string) {
    const queryBuilder = createQueryBuilder()
      .select(['id'])
      .from(User, 'user')
      .where(`user.deviceId =:deviceId`, { deviceId });

    return await queryBuilder.getRawOne();
  }
}
