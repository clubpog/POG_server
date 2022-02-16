import { Test, TestingModule } from '@nestjs/testing';
import { User } from '@app/entity/domain/user/User.entity';
import { getConnection, Repository } from 'typeorm';
import { UserModule } from '@app/entity/domain/user/UserModule';
import { getPgTestTypeOrmModule } from '../../../getPgTestTypeOrmModule';
import { ConfigModule } from '@nestjs/config';
import {
  AuthConfig,
  TestDatabaseConfig,
  ValidationSchema,
} from '@app/common-config/config';

describe('UserRepository', () => {
  let userRepository: Repository<User>;

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
    }).compile();

    userRepository = module.get('UserRepository');
    await userRepository.clear();
  });

  afterEach(async () => {
    await userRepository.clear();
  });

  afterAll(async () => {
    await getConnection().close();
  });

  it('save', async () => {
    // given
    const userId = 'test';
    const password = 'test';
    const deviceId = 'test';
    const firebaseToken = 'test';

    const user = new User();
    user.userId = userId;
    user.password = password;
    user.deviceId = deviceId;
    user.firebaseToken = firebaseToken;

    // when
    const savedUser = await userRepository.save(user);

    // then
    expect(savedUser.id).not.toBeNull();
  });
});
