import { UserApiRepository } from './../../../../src/user/UserApiRepository';
import { UserApiQueryRepository } from './../../../../src/user/UserApiQueryRepository';
import { getConnection, Repository } from 'typeorm';
import { Test, TestingModule } from '@nestjs/testing';

import { User } from '@app/entity/domain/user/User.entity';
import { ConfigModule } from '@nestjs/config';
import { getTestTypeOrmModule } from '../../../../../../libs/entity/getTestTypeOrmModule';
import { ValidationSchema } from '@app/common-config/config/validationSchema';
import { UserApiService } from '../../../../src/user/UserApiService';
import { UserModule } from '@app/entity/domain/user/UserModule';

describe('UserApiService', () => {
  let userRepository: Repository<User>;
  let sut: UserApiService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        UserModule,
        ConfigModule.forRoot({
          isGlobal: true,
          validationSchema: ValidationSchema,
        }),
        getTestTypeOrmModule(),
      ],
      providers: [UserApiService, UserApiQueryRepository, UserApiRepository],
    }).compile();

    userRepository = module.get('UserRepository');
    sut = module.get<UserApiService>(UserApiService);

    await userRepository.delete({});
  });

  afterAll(async () => {
    await getConnection().close();
  });

  afterEach(async () => {
    await userRepository.delete({});
  });

  it('updateFcmToken', async () => {
    //given
    const deviceId = 'test';
    const firebaseToken = 'test';
    await userRepository.save(await User.signup(deviceId, firebaseToken));

    //when
    await sut.updateFcmToken(await User.updateFcmToken('test2', 'test'));
    const user = await userRepository.findOne();

    //then
    expect(user).toBeInstanceOf(User);
    expect(user.id).not.toBeNull();
    expect(user.firebaseToken).toBe('test2');
  });

  it('updatePushV1', async () => {
    //given
    const deviceId = 'test';
    const firebaseToken = 'test';
    await userRepository.save(await User.signup(deviceId, firebaseToken));

    //when
    await sut.updatePushV1(await User.updatePush('test', true));
    const user = await userRepository.findOne();

    //then
    expect(user).toBeInstanceOf(User);
    expect(user.id).not.toBeNull();
    expect(user.isPush).toBe(true);
  });
});
