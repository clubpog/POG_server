import { UserApiService } from '../../../../src/user/UserApiService';
import { UserApiRepositoryStub } from '../../stub/user/UserApiRepositoryStub';
import { User } from '@app/entity/domain/user/User.entity';

describe('UserApiService', () => {
  let userApiRepository: UserApiRepositoryStub;

  it('FCM 토큰 업데이트에 성공했습니다.', async () => {
    // given
    userApiRepository = new UserApiRepositoryStub();

    const sut = new UserApiService(userApiRepository);
    // when
    const actual = await sut.updateFcmToken(
      await User.updateFcmToken('test', 'test213'),
    );
    // then
    expect(actual).toBeUndefined();
  });
});
