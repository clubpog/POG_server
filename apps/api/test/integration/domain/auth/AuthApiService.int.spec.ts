import { UserApiService } from '../../../../src/user/UserApiService';
import { AuthApiService } from '../../../../src/auth/AuthApiService';
import { Repository } from 'typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { UserModule } from '@app/entity/domain/user/UserModule';

import { User } from '@app/entity/domain/user/User.entity';
import { getPgTestTypeOrmModule } from '../../../../../../libs/entity/test/getPgTestTypeOrmModule';
import { ConfigModule } from '@nestjs/config';
import {
  AuthConfig,
  TestDatabaseConfig,
  ValidationSchema,
} from '@app/common-config/config';

describe('AuthApiService', () => {
  let userRepository: Repository<User>;
  let authApiService: AuthApiService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        UserModule,
        ConfigModule.forRoot({
          load: [TestDatabaseConfig, AuthConfig],
          isGlobal: true,
          validationSchema: ValidationSchema,
        }),
        getPgTestTypeOrmModule(),
      ],
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
    // const userId = 'test';
    // const password = 'test';
    const deviceId = 'test';
    const firebaseToken = 'test';
    const isPush = true;

    await authApiService.signup(
      await User.signup(deviceId, firebaseToken, isPush),
    );

    const user = await userRepository.findOne();

    expect(user).toBeInstanceOf(User);
    expect(user.id !== null).toBeTruthy();
  });
});
