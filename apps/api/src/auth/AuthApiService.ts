import { AuthSigninReq } from './dto/AuthSigninReq.dto';
import { UserApiQueryRepository } from './../user/UserApiQueryRepository';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '@app/entity/domain/user/User.entity';
import { Repository } from 'typeorm';
import { UserId } from '@app/entity/domain/user/UserId';

@Injectable()
export class AuthApiService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
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
    return foundUserId;
  }

  async findUserByDeviceId(deviceId: string): Promise<UserId> {
    return await this.userApiQueryRepository.findUserIdByDeviceId(deviceId);
  }
}

/**
 * 유저 로그인 타임 업데이트
 * @type UPDATE
 * @param userIdx
 * @return
 */
//  setLoggedAt: async (userIdx) => {
//   const query = `UPDATE ${userTable} SET loggedAt = CURRENT_TIMESTAMP WHERE userIdx = ${userIdx}`;
//   try {
//       await pool.queryParamArr(query);
//   } catch (err) {
//       console.log('setLoggedAt ERROR: ', err);
//       throw err;
//   }
// },
