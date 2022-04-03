import { CacheStub } from './../../../../../../libs/entity/test/stub/CacheManagerStub';
import { FavoriteSummonerApiService } from './../../../../src/favoriteSummoner/FavoriteSummonerApiService';
import { FavoriteSummonerRepositoryStub } from '../../stub/favoriteSummoner/FavoriteSummonerRepositoryStub';
import { SummonerRecordRepositoryStub } from '../../stub/summonerRecord/SummonerRecordRepositoryStub';
import { SummonerRecordApiQueryRepositoryStub } from '../../stub/summonerRecord/SummonerRecordApiQueryRepositoryStub';
import { FavoriteSummonerApiQueryRepositoryStub } from '../../stub/favoriteSummoner/FavoriteSummonerApiQueryRepositoryStub';
import { FavoriteSummonerReq } from '../../../../../../apps/api/src/favoriteSummoner/dto/FavoriteSummonerReq.dto';
import { UserReq } from '../../../../../../apps/api/src/user/dto/UserReq.dto';
import { ForbiddenException, NotFoundException } from '@nestjs/common';
import { User } from '@app/entity/domain/user/User.entity';

describe('FavoriteSummonerApiService', () => {
  let favoriteSummonerRepository;
  let summonerRecordRepository;
  let summonerRecordApiQueryRepository: SummonerRecordApiQueryRepositoryStub;
  let favoriteSummonerApiQueryRepository: FavoriteSummonerApiQueryRepositoryStub;
  let cacheManager;
  it('즐겨찾기 추가에 성공했습니다.', async () => {
    // given
    favoriteSummonerRepository = new FavoriteSummonerRepositoryStub();
    summonerRecordRepository = new SummonerRecordRepositoryStub();
    summonerRecordApiQueryRepository =
      new SummonerRecordApiQueryRepositoryStub();
    favoriteSummonerApiQueryRepository =
      new FavoriteSummonerApiQueryRepositoryStub();
    cacheManager = new CacheStub();

    const sut = new FavoriteSummonerApiService(
      favoriteSummonerRepository,
      summonerRecordRepository,
      summonerRecordApiQueryRepository,
      favoriteSummonerApiQueryRepository,
      cacheManager,
    );
    // when
    const actual = await sut.createFavoriteSummoner(
      UserReq.of('test', 1),
      FavoriteSummonerReq.of(
        'test',
        'test',
        1,
        1,
        6,
        'test',
        'test',
        1,
        'test',
      ),
    );
    // then
    expect(actual).toBeUndefined();
  });

  it('즐겨찾기 한도가 초과되었습니다.', async () => {
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

    await expect(async () => {
      // when
      await sut.createFavoriteSummoner(
        UserReq.of('test2', 2),
        FavoriteSummonerReq.of(
          'test',
          'test',
          1,
          1,
          6,
          'test',
          'test',
          1,
          'test',
        ),
      );
      // then
    }).rejects.toThrowError(
      new ForbiddenException('즐겨찾기 한도가 초과되었습니다.'),
    );
  });

  it('즐겨찾기 삭제에 성공했습니다.', async () => {
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
    const actual = await sut.deleteFavoriteSummoner(
      UserReq.of('test', 1),
      FavoriteSummonerReq.of(
        'test',
        'test',
        1,
        1,
        6,
        'test',
        'test',
        1,
        'test',
      ),
    );
    // then
    expect(actual).toBeUndefined();
  });

  it('삭제할 즐겨찾기를 조회할 수 없습니다.', async () => {
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

    await expect(async () => {
      // when
      await sut.deleteFavoriteSummoner(
        UserReq.of('test2', 2),
        FavoriteSummonerReq.of(
          'test',
          'test',
          1,
          1,
          6,
          'test',
          'test',
          1,
          'test',
        ),
      );
      // then
    }).rejects.toThrowError(
      new NotFoundException('삭제할 즐겨찾기를 조회할 수 없습니다.'),
    );
  });

  it('즐겨찾기 조회에 성공했습니다.', async () => {
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
    const actual = await sut.getFavoriteSummoner(
      await User.jwtUserReq('test', 1),
    );
    // then
    expect(actual[0].id).toBe(1);
    expect(actual[0].name).toBe('test');
    expect(actual[0].tier).toBe('test');
    expect(actual[0].win).toBe(1);
    expect(actual[0].lose).toBe(1);
    expect(actual[0].puuid).toBe('test');
    expect(actual[0].rank).toBe('test');
    expect(actual[0].profileIconId).toBe(1);
    expect(actual[0].summonerId).toBe('test');
    expect(actual[0].leaguePoint).toBe(1);
  });
});
