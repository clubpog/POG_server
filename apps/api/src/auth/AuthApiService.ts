import { UserApiService } from './../user/UserApiService';
import { Injectable } from '@nestjs/common';
import { User } from '@app/entity/domain/user/user.entity';

@Injectable()
export class AuthApiService {
  constructor(private readonly userApiService: UserApiService) {}

  async signup(signupUser: User): Promise<void> {
    await this.userApiService.create(signupUser);
  }
}
