import { UserApiModule } from './../../../../src/user/UserApiModule';
import { JwtPayload } from '@app/common-config/jwt/JwtPayload';
import { UserId } from '@app/entity/domain/user/UserId';
import { JwtStrategy } from '@app/common-config/jwt/JwtStrategy';
import { AuthApiService } from '../../../../src/auth/AuthApiService';
import { getConnection, Repository } from 'typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { UserModule } from '@app/entity/domain/user/UserModule';

import { User } from '@app/entity/domain/user/User.entity';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { getTestTypeOrmModule } from '../../../../../../libs/entity/getTestTypeOrmModule';
import { ValidationSchema } from '@app/common-config/config/validationSchema';

describe('AuthApiService', () => {
  let userRepository: Repository<User>;
  let sut: AuthApiService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        UserModule,
        UserApiModule,
        PassportModule.register({ defaultStrategy: 'jwt', session: false }),
        JwtModule.registerAsync({
          useFactory: async () => ({
            secret: process.env.JWT_SECRET_KEY,
            signOptions: { expiresIn: '1y' },
          }),
        }),
        ConfigModule.forRoot({
          isGlobal: true,
          validationSchema: ValidationSchema,
        }),
        getTestTypeOrmModule(),
      ],
      providers: [AuthApiService, JwtStrategy],
    }).compile();

    userRepository = module.get('UserRepository');
    sut = module.get<AuthApiService>(AuthApiService);

    await userRepository.delete({});
  });

  afterAll(async () => {
    await getConnection().close();
  });

  afterEach(async () => {
    await userRepository.delete({});
  });

  it('signupV1', async () => {
    //given
    const deviceId = 'test';
    const firebaseToken = 'test';

    //when
    await sut.signupV1(await User.signup(deviceId, firebaseToken));

    const user = await userRepository.findOne();

    //then
    expect(user).toBeInstanceOf(User);
    expect(user.id).not.toBeNull();
  });

  it('findUserByDeviceId', async () => {
    //given
    const deviceId = 'test';
    const firebaseToken = 'test';
    await userRepository.save(await User.signup(deviceId, firebaseToken));

    //when
    const user = await sut.findUserByDeviceId(deviceId);

    //then
    expect(user).toBeInstanceOf(UserId);
    expect(user.id).not.toBeNull();
  });

  it('validateUser', async () => {
    //given
    const deviceId = 'test';
    const firebaseToken = 'test';
    await userRepository.save(await User.signup(deviceId, firebaseToken));

    const jwtPayload = new JwtPayload();
    jwtPayload.deviceId = deviceId;

    //when
    const user = await sut.validateUser(jwtPayload);

    //then
    expect(user).toBeInstanceOf(JwtPayload);
    expect(user.deviceId).toBe('test');
  });

  it('signinV1', async () => {
    //given
    const deviceId = 'test';
    const firebaseToken = 'test';
    await userRepository.save(await User.signup(deviceId, firebaseToken));

    //when
    const user = await sut.signinV1(await User.signin(deviceId));

    //then
    expect(user.accessToken).not.toBeUndefined();
  });
});
