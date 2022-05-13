import { RedisServiceStub } from '../../../../../../libs/entity/test/stub/RedisServiceStub';
import { FavoriteSummonerApiService } from './../../../../src/favoriteSummoner/FavoriteSummonerApiService';
import { FavoriteSummonerRepositoryStub } from '../../stub/favoriteSummoner/FavoriteSummonerRepositoryStub';
import { SummonerRecordRepositoryStub } from '../../stub/summonerRecord/SummonerRecordRepositoryStub';
import { SummonerRecordApiQueryRepositoryStub } from '../../stub/summonerRecord/SummonerRecordApiQueryRepositoryStub';
import { FavoriteSummonerApiQueryRepositoryStub } from '../../stub/favoriteSummoner/FavoriteSummonerApiQueryRepositoryStub';
import { FavoriteSummonerReq } from '../../../../../../apps/api/src/favoriteSummoner/dto/FavoriteSummonerReq.dto';
import { UserReq } from '../../../../../../apps/api/src/user/dto/UserReq.dto';
import {
  ForbiddenException,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { User } from '@app/entity/domain/user/User.entity';
import { Logger } from '../../../../../../libs/common-config/test/stub/LoggerStub';
import { IEventStoreService } from '../../../../../../libs/cache/interface/integration';
import { ConnectionStub } from '../../../../../../libs/entity/test/stub/ConnectionStub';

describe('FavoriteSummonerApiService', () => {
  let favoriteSummonerRepository;
  let summonerRecordRepository;
  let summonerRecordApiQueryRepository: SummonerRecordApiQueryRepositoryStub;
  let favoriteSummonerApiQueryRepository: FavoriteSummonerApiQueryRepositoryStub;
  let redisClient: IEventStoreService;
  let logger;
  let connection;

  it('즐겨찾기 추가에 성공했습니다.', async () => {
    // given
    favoriteSummonerRepository = new FavoriteSummonerRepositoryStub();
    summonerRecordRepository = new SummonerRecordRepositoryStub();
    summonerRecordApiQueryRepository =
      new SummonerRecordApiQueryRepositoryStub();
    favoriteSummonerApiQueryRepository =
      new FavoriteSummonerApiQueryRepositoryStub();
    redisClient = new RedisServiceStub();
    logger = new Logger();
    connection = new ConnectionStub();

    const sut = new FavoriteSummonerApiService(
      favoriteSummonerRepository,
      summonerRecordRepository,
      summonerRecordApiQueryRepository,
      favoriteSummonerApiQueryRepository,
      redisClient,
      logger,
      connection,
    );
    // when
    const actual = await sut.createFavoriteSummonerV1(
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
    redisClient = new RedisServiceStub();
    logger = new Logger();

    const sut = new FavoriteSummonerApiService(
      favoriteSummonerRepository,
      summonerRecordRepository,
      summonerRecordApiQueryRepository,
      favoriteSummonerApiQueryRepository,
      redisClient,
      logger,
    );

    await expect(async () => {
      // when
      await sut.createFavoriteSummonerV1(
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

  it('원인 모를 문제 때문에 즐겨찾기 추가에 실패했습니다.', async () => {
    // given
    favoriteSummonerRepository = new FavoriteSummonerRepositoryStub();
    summonerRecordRepository = new SummonerRecordRepositoryStub();
    summonerRecordApiQueryRepository =
      new SummonerRecordApiQueryRepositoryStub();
    favoriteSummonerApiQueryRepository =
      new FavoriteSummonerApiQueryRepositoryStub();
    redisClient = new RedisServiceStub();
    logger = new Logger();

    const sut = new FavoriteSummonerApiService(
      favoriteSummonerRepository,
      summonerRecordRepository,
      summonerRecordApiQueryRepository,
      favoriteSummonerApiQueryRepository,
      redisClient,
      logger,
    );

    await expect(async () => {
      // when
      await sut.createFavoriteSummonerV1(
        UserReq.of('test3', 3),
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
    }).rejects.toThrowError(new InternalServerErrorException());
  });

  it('즐겨찾기 삭제에 성공했습니다.', async () => {
    // given
    favoriteSummonerRepository = new FavoriteSummonerRepositoryStub();
    summonerRecordRepository = new SummonerRecordRepositoryStub();
    summonerRecordApiQueryRepository =
      new SummonerRecordApiQueryRepositoryStub();
    favoriteSummonerApiQueryRepository =
      new FavoriteSummonerApiQueryRepositoryStub();
    redisClient = new RedisServiceStub();

    const sut = new FavoriteSummonerApiService(
      favoriteSummonerRepository,
      summonerRecordRepository,
      summonerRecordApiQueryRepository,
      favoriteSummonerApiQueryRepository,
      redisClient,
    );
    // when
    const actual = await sut.deleteFavoriteSummonerV1(
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
    redisClient = new RedisServiceStub();
    logger = new Logger();

    const sut = new FavoriteSummonerApiService(
      favoriteSummonerRepository,
      summonerRecordRepository,
      summonerRecordApiQueryRepository,
      favoriteSummonerApiQueryRepository,
      redisClient,
      logger,
    );

    await expect(async () => {
      // when
      await sut.deleteFavoriteSummonerV1(
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

  it('원인 모를 문제 때문에 즐겨찾기 삭제에 실패했습니다.', async () => {
    // given
    favoriteSummonerRepository = new FavoriteSummonerRepositoryStub();
    summonerRecordRepository = new SummonerRecordRepositoryStub();
    summonerRecordApiQueryRepository =
      new SummonerRecordApiQueryRepositoryStub();
    favoriteSummonerApiQueryRepository =
      new FavoriteSummonerApiQueryRepositoryStub();
    redisClient = new RedisServiceStub();
    logger = new Logger();

    const sut = new FavoriteSummonerApiService(
      favoriteSummonerRepository,
      summonerRecordRepository,
      summonerRecordApiQueryRepository,
      favoriteSummonerApiQueryRepository,
      redisClient,
      logger,
    );

    await expect(async () => {
      // when
      await sut.deleteFavoriteSummonerV1(
        UserReq.of('test2', 3),
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
    }).rejects.toThrowError(new InternalServerErrorException());
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
    const actual = await sut.getFavoriteSummonerV1(
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

  it('원인 모를 문제 때문에 즐겨찾기 조회에 실패했습니다.', async () => {
    // given
    favoriteSummonerRepository = new FavoriteSummonerRepositoryStub();
    summonerRecordRepository = new SummonerRecordRepositoryStub();
    summonerRecordApiQueryRepository =
      new SummonerRecordApiQueryRepositoryStub();
    favoriteSummonerApiQueryRepository =
      new FavoriteSummonerApiQueryRepositoryStub();
    redisClient = new RedisServiceStub();
    logger = new Logger();

    const sut = new FavoriteSummonerApiService(
      favoriteSummonerRepository,
      summonerRecordRepository,
      summonerRecordApiQueryRepository,
      favoriteSummonerApiQueryRepository,
      redisClient,
      logger,
    );

    await expect(async () => {
      // when
      await sut.getFavoriteSummonerV1(await User.jwtUserReq('test', 3));
      // then
    }).rejects.toThrowError(new InternalServerErrorException());
  });
});
