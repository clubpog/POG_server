import { JwtPayload } from '@app/common-config/jwt/JwtPayload';
import { UserAccessToken } from '@app/entity/domain/user/UserAccessToken';
import { UserApiQueryRepository } from './../user/UserApiQueryRepository';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { User } from '@app/entity/domain/user/User.entity';
import { Repository } from 'typeorm';
import { UserApiRepository } from './../user/UserApiRepository';
import { JwtService } from '@nestjs/jwt';
import { UserId } from '@app/entity/domain/user/UserId';

@Injectable()
export class AuthApiService {
  constructor(
    @InjectRepository(User)
    private userRepository?: Repository<User>,
    private readonly userApiRepository?: UserApiRepository,
    private readonly userApiQueryRepository?: UserApiQueryRepository,
    private readonly jwtService?: JwtService,
  ) {}

  async signup(signupUser: User): Promise<User> {
    try {
      return await this.userRepository.save(signupUser);
    } catch (error) {
      if (error.code === '23505') {
        throw new UnprocessableEntityException(
          '이미 DB에 있는 deviceId를 입력했습니다.',
        );
      }
      throw new InternalServerErrorException();
    }
  }

  async signin(signinUser: User): Promise<UserAccessToken> {
    const foundUserId = await this.findUserByDeviceId(signinUser.deviceId);
    try {
      await this.updateLoggedAt(signinUser.loggedAt, signinUser.deviceId);
      const payload: JwtPayload = {
        userId: foundUserId.id,
        deviceId: signinUser.deviceId,
      };
      return { accessToken: this.jwtService.sign(payload) };
    } catch (error) {
      if (!foundUserId)
        throw new NotFoundException('입력된 deviceId가 존재하지 않습니다.');
      throw new InternalServerErrorException();
    }
  }

  async validateUser(payload: JwtPayload): Promise<JwtPayload> {
    const { deviceId } = payload;
    const user: UserId = await this.findUserByDeviceId(deviceId);
    if (!user) {
      throw new UnauthorizedException('요청을 처리할수 없습니다.');
    }
    return payload;
  }

  async updateLoggedAt(loggedAt: Date, deviceId: string): Promise<void> {
    return await this.userApiRepository.updateLoggedAtByDeviceId(
      loggedAt,
      deviceId,
    );
  }

  async findUserByDeviceId(deviceId: string): Promise<UserId> {
    return await this.userApiQueryRepository.findUserIdByDeviceId(deviceId);
  }
}
