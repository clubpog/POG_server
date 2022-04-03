import { Logger } from '../../../../../../libs/common-config/test/stub/LoggerStub';
import { JwtServiceStub } from './../../stub/JwtServiceStub';
import { AuthApiService } from './../../../../src/auth/AuthApiService';
import { UserRepositoryStub } from '../../stub/user/UserRepositoryStub';
import { UserApiRepositoryStub } from '../../stub/user/UserApiRepositoryStub';
import { UserApiQueryRepositoryStub } from '../../stub/user/UserApiQueryRepositoryStub';
import { User } from '@app/entity/domain/user/User.entity';
import { NotFoundException } from '@nestjs/common';

describe('AuthApiService', () => {
  let userRepository;
  let userApiRepository: UserApiRepositoryStub;
  let userApiQueryRepository: UserApiQueryRepositoryStub;
  let jwtService;

  it('회원가입에 성공했습니다.', async () => {
    // given
    userRepository = new UserRepositoryStub();
    const sut = new AuthApiService(userRepository);

    // when
    const actual = await sut.signup(await User.signup('test213', 'test'));

    // then
    expect(actual.deviceId).toBe('test213');
    expect(actual.firebaseToken).toBe('test');
  });

  it('동일한 아이디로 회원가입을 했을 때 회원가입에 실패합니다.', async () => {
    // given
    userRepository = new UserRepositoryStub();
    const sut = new AuthApiService(userRepository);

    // when
    await sut.signup(await User.signup('test213', 'test'));
    const actual = await sut.signup(await User.signup('test213', 'test'));

    // then
    expect(actual['severity']).toBe('ERROR');
    expect(actual['code']).toBe('23505');
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
    const actual = await sut.signin(await User.signin('test'));
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
    const sut = new AuthApiService(
      userRepository,
      userApiRepository,
      userApiQueryRepository,
      jwtService,
    );

    await expect(async () => {
      // when
      await sut.signin(await User.signinTest());

      // then
    }).rejects.toThrowError(
      new NotFoundException('입력된 deviceId가 존재하지 않습니다.'),
    );
  });
});
