import { JwtStrategy } from '@app/common-config/jwt/JwtStrategy';
import { UserApiModule } from './../../../../src/user/UserApiModule';
import { FavoriteModule } from '@app/entity/domain/favorite/FavoriteModule';
import { UserApiService } from '../../../../src/user/UserApiService';
import { AuthApiService } from '../../../../src/auth/AuthApiService';
import { Repository } from 'typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { UserModule } from '@app/entity/domain/user/UserModule';

import { User } from '@app/entity/domain/user/User.entity';
import { ConfigModule } from '@nestjs/config';
import {
  AuthConfig,
  TestDatabaseConfig,
  ValidationSchema,
} from '@app/common-config/config';
import { Favorite } from '@app/entity/domain/favorite/Favorite.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { getTypeOrmModule } from '../../../../../../libs/entity/getTypeOrmModule';

describe('AuthApiService', () => {
  let userRepository: Repository<User>;
  let favoriteRepository: Repository<Favorite>;
  let authApiService: AuthApiService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        UserModule,
        UserApiModule,
        FavoriteModule,
        ConfigModule.forRoot({
          load: [TestDatabaseConfig, AuthConfig],
          isGlobal: true,
          validationSchema: ValidationSchema,
        }),
        PassportModule.register({ defaultStrategy: 'jwt', session: false }),
        JwtModule.registerAsync({
          useFactory: async () => ({
            secret: process.env.JWT_SECRET_KEY,
            signOptions: { expiresIn: '1y' },
          }),
        }),
        getTypeOrmModule(),
      ],
      providers: [AuthApiService, UserApiService, JwtStrategy],
    }).compile();

    userRepository = module.get('UserRepository');
    favoriteRepository = module.get('FavoriteRepository');
    authApiService = module.get<AuthApiService>(AuthApiService);
  });

  beforeEach(async () => {
    await userRepository.delete({});
    await favoriteRepository.delete({});
  });

  it('signup', async () => {
    //given
    // const userId = 'test';
    // const password = 'test';
    const deviceId = 'test';
    const firebaseToken = 'test';

    await authApiService.signup(await User.signup(deviceId, firebaseToken));

    const user = await userRepository.findOne();

    expect(user).toBeInstanceOf(User);
    expect(user.id !== null).toBeTruthy();
  });
});
