import { UserApiService } from '../../../../src/user/UserApiService';
import { AuthApiService } from '../../../../src/auth/AuthApiService';
import { Repository } from 'typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { UserModule } from '@app/entity/domain/user/UserModule';

import { User } from '@app/entity/domain/user/User.entity';
import { getPgTestTypeOrmModule } from '../../../../../../libs/entity/test/getPgTestTypeOrmModule';

describe('AuthApiService', () => {
  let userRepository: Repository<User>;
  let authApiService: AuthApiService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [UserModule, getPgTestTypeOrmModule()],
      providers: [AuthApiService, UserApiService],
    }).compile();

    userRepository = module.get('UserRepository');
    authApiService = module.get<AuthApiService>(AuthApiService);
  });

  beforeEach(async () => {
    await userRepository.clear();
  });

  it('signup', async () => {
    //given
    const userId = 'test';
    const password = 'test';
    const deviceId = 'test';
    const firebaseToken = 'test';

    await authApiService.signup(
      await User.signup(userId, password, deviceId, firebaseToken),
    );

    const user = await userRepository.findOne();

    expect(user).toBeInstanceOf(User);
    expect(user.id !== null).toBeTruthy();
  });
});