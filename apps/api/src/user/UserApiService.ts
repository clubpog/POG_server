import { UserUpdateFcmTokenReq } from './dto/UserUpdateFcmTokenReq.dto';
import { UserApiRepository } from './UserApiRepository';
import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateResult } from 'typeorm';
import { User } from '@app/entity/domain/user/User.entity';
import { JwtPayload } from '@app/common-config/jwt/JwtPayload';
import { UserUpdatePushReq } from './dto/UserUpdatePushReq.dto';

@Injectable()
export class UserApiService {
  constructor(private readonly userApiRepository: UserApiRepository) {}

  async updateFcmToken(updateFcmTokenUser: User): Promise<void> {
    return await this.userApiRepository.updateFirebaseToken(
      updateFcmTokenUser.firebaseToken,
      updateFcmTokenUser.deviceId,
    );
  }

  async updatePush(
    UserUpdatePushDto: UserUpdatePushReq,
    userDto: JwtPayload,
  ): Promise<UpdateResult> {
    const user: User = await User.updatePush(
      userDto.deviceId,
      UserUpdatePushDto.isPush,
    );
    const isUpdatePush = await this.userApiRepository.updatePush(
      user.deviceId,
      user.isPush,
    );
    return isUpdatePush;
  }
}
