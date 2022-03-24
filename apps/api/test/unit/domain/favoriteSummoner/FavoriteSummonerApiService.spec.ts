import { FavoriteSummonerApiService } from './../../../../src/favoriteSummoner/FavoriteSummonerApiService';
import { FavoriteSummonerRepositoryStub } from '../../stub/favoriteSummoner/FavoriteSummonerRepositoryStub';
import { SummonerRecordRepositoryStub } from '../../stub/summonerRecord/SummonerRecordRepositoryStub';
import { SummonerRecordApiQueryRepositoryStub } from '../../stub/summonerRecord/SummonerRecordApiQueryRepositoryStub';
import { FavoriteSummonerApiQueryRepositoryStub } from '../../stub/favoriteSummoner/FavoriteSummonerApiQueryRepositoryStub';
import { FavoriteSummonerReq } from '../../../../../../apps/api/src/favoriteSummoner/dto/FavoriteSummonerReq.dto';
import { UserReq } from '../../../../../../apps/api/src/user/dto/UserReq.dto';

describe('FavoriteSummonerApiService', () => {
  let favoriteSummonerRepository;
  let summonerRecordRepository;
  let summonerRecordApiQueryRepository: SummonerRecordApiQueryRepositoryStub;
  let favoriteSummonerApiQueryRepository: FavoriteSummonerApiQueryRepositoryStub;

  it('즐겨찾기 추가에 성공했습니다.', async () => {
    // given
    favoriteSummonerRepository = new FavoriteSummonerRepositoryStub();
    summonerRecordRepository = new SummonerRecordRepositoryStub();
    summonerRecordApiQueryRepository =
      new SummonerRecordApiQueryRepositoryStub();
    favoriteSummonerApiQueryRepository =
      new FavoriteSummonerApiQueryRepositoryStub();

    const sut = new FavoriteSummonerApiService(
      favoriteSummonerRepository,
      summonerRecordRepository,
      summonerRecordApiQueryRepository,
      favoriteSummonerApiQueryRepository,
    );
    // when
    const actual = await sut.createFavoriteSummoner(
      UserReq.of('test', 1),
      FavoriteSummonerReq.of(
        'test',
        'test',
        1,
        1,
        'test',
        'test',
        'test',
        1,
        'test',
      ),
    );
    // then
    expect(actual).toBeUndefined();
  });
});
