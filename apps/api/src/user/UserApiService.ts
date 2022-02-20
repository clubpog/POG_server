import { UserApiRepository } from './UserApiRepository';
import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateResult } from 'typeorm';
import { User } from '@app/entity/domain/user/User.entity';

@Injectable()
export class UserApiService {
  constructor(private readonly UserApiRepository: UserApiRepository) {}

  async updateFcmToken(fcmTokenUser: User): Promise<UpdateResult> {
    const isUpdateFcmToken = await this.UserApiRepository.updateFirebaseToken(
      fcmTokenUser.firebaseToken,
      fcmTokenUser.deviceId,
    );
    if (isUpdateFcmToken.affected === 0) throw new NotFoundException();
    return isUpdateFcmToken;
  }
}
