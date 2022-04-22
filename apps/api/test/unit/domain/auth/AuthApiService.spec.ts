import { Logger } from '../../../../../../libs/common-config/test/stub/LoggerStub';
import { JwtServiceStub } from './../../stub/JwtServiceStub';
import { AuthApiService } from './../../../../src/auth/AuthApiService';
import { UserRepositoryStub } from '../../stub/user/UserRepositoryStub';
import { UserApiRepositoryStub } from '../../stub/user/UserApiRepositoryStub';
import { UserApiQueryRepositoryStub } from '../../stub/user/UserApiQueryRepositoryStub';
import { User } from '@app/entity/domain/user/User.entity';
import {
  InternalServerErrorException,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';

describe('AuthApiService', () => {
  let userRepository;
  let userApiRepository: UserApiRepositoryStub;
  let userApiQueryRepository: UserApiQueryRepositoryStub;
  let jwtService;
  let logger;

  it('회원가입에 성공했습니다.', async () => {
    // given
    userRepository = new UserRepositoryStub();
    const sut = new AuthApiService(userRepository);

    // when
    const actual = await sut.signupV1(await User.signup('test213', 'test'));

    // then
    expect(actual.deviceId).toBe('test213');
    expect(actual.firebaseToken).toBe('test');
  });

  it('동일한 아이디로 회원가입을 했을 때 회원가입에 실패합니다.', async () => {
    // given
    userRepository = new UserRepositoryStub();
    userApiRepository = new UserApiRepositoryStub();
    userApiQueryRepository = new UserApiQueryRepositoryStub();
    jwtService = new JwtServiceStub(
      { secret: 'test', signOptions: { expiresIn: '1y' } },
      new Logger('JwtService', {}),
    );
    logger = new Logger();

    const sut = new AuthApiService(
      userRepository,
      userApiRepository,
      userApiQueryRepository,
      jwtService,
      logger,
    );

    await expect(async () => {
      // when
      await sut.signupV1(await User.signup('test213', 'test'));
      await sut.signupV1(await User.signup('test213', 'test'));
      // then
    }).rejects.toThrowError(
      new UnprocessableEntityException(
        '이미 DB에 있는 deviceId를 입력했습니다.',
      ),
    );
  });

  it('이유 모를 문제 때문에 회원가입에 실패합니다.', async () => {
    // given
    userRepository = new UserRepositoryStub();
    userApiRepository = new UserApiRepositoryStub();
    userApiQueryRepository = new UserApiQueryRepositoryStub();
    jwtService = new JwtServiceStub(
      { secret: 'test', signOptions: { expiresIn: '1y' } },
      new Logger('JwtService', {}),
    );
    logger = new Logger();

    const sut = new AuthApiService(
      userRepository,
      userApiRepository,
      userApiQueryRepository,
      jwtService,
      logger,
    );

    await expect(async () => {
      // when
      await sut.signupV1(await User.signup('test214', 'test'));
      // then
    }).rejects.toThrowError(new InternalServerErrorException());
  });

  it('로그인에 성공했습니다.', async () => {
    // given
    userRepository = new UserRepositoryStub();
    userApiRepository = new UserApiRepositoryStub();
    userApiQueryRepository = new UserApiQueryRepositoryStub();
    jwtService = new JwtServiceStub(
      { secret: 'test', signOptions: { expiresIn: '1y' } },
      new Logger('JwtService', {}),
    );
    const sut = new AuthApiService(
      userRepository,
      userApiRepository,
      userApiQueryRepository,
      jwtService,
    );
    // when
    const actual = await sut.signinV1(await User.signin('test'));
    // then
    expect(Object.keys(actual)).toContain('accessToken');
  });

  it('DB에 없는 deviceId를 입력하여 로그인에 실패했습니다.', async () => {
    // given
    userRepository = new UserRepositoryStub();
    userApiRepository = new UserApiRepositoryStub();
    userApiQueryRepository = new UserApiQueryRepositoryStub();
    jwtService = new JwtServiceStub(
      { secret: 'test', signOptions: { expiresIn: '1y' } },
      new Logger('JwtService', {}),
    );
    logger = new Logger();

    const sut = new AuthApiService(
      userRepository,
      userApiRepository,
      userApiQueryRepository,
      jwtService,
      logger,
    );

    await expect(async () => {
      // when
      await sut.signinV1(await User.signinTest());

      // then
    }).rejects.toThrowError(
      new NotFoundException('입력된 deviceId가 존재하지 않습니다.'),
    );
  });

  it('이유 모를 문제 때문에 로그인에 실패합니다.', async () => {
    // given
    userRepository = new UserRepositoryStub();
    userApiRepository = new UserApiRepositoryStub();
    userApiQueryRepository = new UserApiQueryRepositoryStub();
    jwtService = new JwtServiceStub(
      { secret: 'test', signOptions: { expiresIn: '1y' } },
      new Logger('JwtService', {}),
    );
    logger = new Logger();

    const sut = new AuthApiService(
      userRepository,
      userApiRepository,
      userApiQueryRepository,
      jwtService,
      logger,
    );

    await expect(async () => {
      // when
      await sut.signinV1(await User.signin('test1'));

      // then
    }).rejects.toThrowError(new InternalServerErrorException());
  });
});
