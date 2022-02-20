import { UserApiQueryRepository } from './../user/UserApiQueryRepository';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '@app/entity/domain/user/User.entity';
import { Repository, UpdateResult } from 'typeorm';
import { UserId } from '@app/entity/domain/user/UserId';
import { UserApiRepository } from './../user/UserApiRepository';

@Injectable()
export class AuthApiService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly userApiRepository: UserApiRepository,
    private readonly userApiQueryRepository: UserApiQueryRepository,
  ) {}

  async signup(signupUser: User): Promise<void> {
    await this.create(signupUser);
  }

  async create(user: User): Promise<void> {
    await this.userRepository.save(user);
  }

  async signin(signinUser: User): Promise<UserId> {
    const foundUserId = await this.findUserByDeviceId(signinUser.deviceId);
    if (foundUserId === undefined) throw new NotFoundException();
    await this.updateLoggedAt(signinUser.loggedAt, signinUser.deviceId);
    return foundUserId;
  }

  async updateLoggedAt(
    loggedAt: Date,
    deviceId: string,
  ): Promise<UpdateResult> {
    return await this.userApiRepository.updateLoggedAtByDeviceId(
      loggedAt,
      deviceId,
    );
  }

  async findUserByDeviceId(deviceId: string): Promise<UserId> {
    return await this.userApiQueryRepository.findUserIdByDeviceId(deviceId);
  }
}
