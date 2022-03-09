import { UserApiRepository } from './UserApiRepository';
import { Injectable } from '@nestjs/common';
import { User } from '@app/entity/domain/user/User.entity';

@Injectable()
export class UserApiService {
  constructor(private readonly userApiRepository: UserApiRepository) {}

  async updateFcmToken(updateFcmTokenUser: User): Promise<void> {
    await this.userApiRepository.updateFirebaseToken(
      updateFcmTokenUser.firebaseToken,
      updateFcmTokenUser.deviceId,
    );
  }

  async updatePush(updatePushUser: User): Promise<void> {
    await this.userApiRepository.updatePush(
      updatePushUser.deviceId,
      updatePushUser.isPush,
    );
  }
}
