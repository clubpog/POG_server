import { UserApiRepository } from './UserApiRepository';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { User } from '@app/entity/domain/user/User.entity';

@Injectable()
export class UserApiService {
  constructor(private readonly userApiRepository: UserApiRepository) {}

  async updateFcmToken(updateFcmTokenUser: User): Promise<void> {
    try {
      await this.userApiRepository.updateFirebaseToken(
        updateFcmTokenUser.firebaseToken,
        updateFcmTokenUser.deviceId,
      );
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async updatePush(updatePushUser: User): Promise<void> {
    try {
      await this.userApiRepository.updatePush(
        updatePushUser.deviceId,
        updatePushUser.isPush,
      );
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
