import { ChangedTierApiQueryRepository } from './../../../../src/changedTier/ChangedTierApiQueryRepository';
import { ChangedTierApiModule } from './../../../../../push/src/changedTier/ChangedTierApiModule';
import { UserModule } from './../../../../../../libs/entity/src/domain/user/UserModule';
import { TestUtils } from './../../../testUtils';
import { FavoriteSummoner } from '@app/entity/domain/favoriteSummoner/FavoriteSummoner.entity';
import { FavoriteSummonerApiQueryRepository } from './../../../../src/favoriteSummoner/FavoriteSummonerApiQueryRepository';
import { FavoriteSummonerApiRepository } from './../../../../src/favoriteSummoner/FavoriteSummonerApiRepository';
import { SummonerRecordApiModule } from './../../../../src/summonerRecord/SummonerRecordApiModule';
import { SummonerRecordModule } from '@app/entity/domain/summonerRecord/SummonerRecordModule';
import { FavoriteSummonerModule } from '@app/entity/domain/favoriteSummoner/FavoriteSummonerModule';
import { getConnection, Repository } from 'typeorm';
import { Test, TestingModule } from '@nestjs/testing';

import { ConfigModule } from '@nestjs/config';
import { getTestTypeOrmModule } from '../../../../../../libs/entity/getTestTypeOrmModule';
import { ValidationSchema } from '@app/common-config/config/validationSchema';
import { FavoriteSummonerApiService } from '../../../../src/favoriteSummoner/FavoriteSummonerApiService';
import { EInfrastructureInjectionToken } from '@app/common-config/enum/InfrastructureInjectionToken';
import { UserReq } from '../../../../src/user/dto/UserReq.dto';
import { FavoriteSummonerReq } from '../../../../src/favoriteSummoner/dto/FavoriteSummonerReq.dto';
import { EventStoreTestModule } from '../../../../../../libs/cache/EventStoreTestModule';
import { EventStoreTestServiceImplement } from '../../../../../../libs/cache/EventStoreTestService';
import { User } from '@app/entity/domain/user/User.entity';
import { SummonerRecord } from '@app/entity/domain/summonerRecord/SummonerRecord.entity';
import { FavoriteSummonerIdReq } from '../../../../src/favoriteSummoner/dto/FavoriteSummonerIdReq.dto';
import { ChangedTier } from '@app/entity/domain/changedTier/ChangedTier.entity';

describe('FavoriteSummonerApiService', () => {
  let favoriteSummonerRepository: Repository<FavoriteSummoner>;
  let userRepository: Repository<User>;
  let summonerRecordRepository: Repository<SummonerRecord>;
  let redisClient: EventStoreTestServiceImplement;
  let sut: FavoriteSummonerApiService;
  let testUtils: TestUtils;
  let userId: number;
  let changedTierRepository: Repository<ChangedTier>;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        FavoriteSummonerModule,
        SummonerRecordModule,
        SummonerRecordApiModule,
        ChangedTierApiModule,
        ConfigModule.forRoot({
          isGlobal: true,
          validationSchema: ValidationSchema,
        }),
        getTestTypeOrmModule(),
        EventStoreTestModule,
        TestUtils,
        UserModule,
      ],
      providers: [
        FavoriteSummonerApiService,
        FavoriteSummonerApiRepository,
        FavoriteSummonerApiQueryRepository,
        ChangedTierApiQueryRepository,
      ],
    }).compile();

    favoriteSummonerRepository = module.get('FavoriteSummonerRepository');
    userRepository = module.get('UserRepository');
    summonerRecordRepository = module.get('SummonerRecordRepository');
    changedTierRepository = module.get('ChangedTierRepository');

    sut = module.get<FavoriteSummonerApiService>(FavoriteSummonerApiService);
    redisClient = module.get<EventStoreTestServiceImplement>(
      EInfrastructureInjectionToken.EVENT_STORE.name,
    );
    testUtils = module.get<TestUtils>(TestUtils);

    await favoriteSummonerRepository.delete({});
    await userRepository.delete({});
    await summonerRecordRepository.delete({});
    await redisClient.flushall();
    await changedTierRepository.delete({});
  });

  afterAll(async () => {
    await getConnection().close();
  });

  afterEach(async () => {
    await favoriteSummonerRepository.delete({});
    await userRepository.delete({});
    await summonerRecordRepository.delete({});
    await redisClient.flushall();
    await changedTierRepository.delete({});
  });

  it('createFavoriteSummonerV1', async () => {
    //given
    const deviceId = 'test';
    userId = await testUtils.createUser();

    //when
    await sut.createFavoriteSummonerV1(
      UserReq.of(deviceId, userId),
      FavoriteSummonerReq.of(
        'test',
        'test',
        1,
        1,
        6,
        'test',
        'test22222',
        1,
        'test',
      ),
    );
    const favoriteSummoner = await favoriteSummonerRepository.findOne();

    //then
    expect(favoriteSummoner).toBeInstanceOf(FavoriteSummoner);
    expect(favoriteSummoner.id).not.toBeNull();
  });

  it('deleteFavoriteSummonerV1', async () => {
    //given
    const deviceId = 'test';
    userId = await testUtils.createUser();

    await sut.createFavoriteSummonerV1(
      UserReq.of(deviceId, userId),
      FavoriteSummonerReq.of(
        'test',
        'test',
        1,
        1,
        6,
        'test',
        'test22222',
        1,
        'test',
      ),
    );

    //when
    await sut.deleteFavoriteSummonerV1(
      UserReq.of(deviceId, userId),
      FavoriteSummonerIdReq.from('test22222'),
    );
    const favoriteSummoner = await favoriteSummonerRepository.findOne();

    //then
    expect(favoriteSummoner).toBeUndefined();
  });

  it('getFavoriteSummonerV1', async () => {
    //given
    const deviceId = 'test';
    userId = await testUtils.createUser();

    await sut.createFavoriteSummonerV1(
      UserReq.of(deviceId, userId),
      FavoriteSummonerReq.of(
        'test',
        'test',
        1,
        1,
        6,
        'test',
        'test22222',
        1,
        'test',
      ),
    );

    //when
    const favoriteSummoners = await sut.getFavoriteSummonerV1(
      await User.jwtUserReq(deviceId, userId),
    );

    //then
    expect(favoriteSummoners[0].id).not.toBeUndefined();
    expect(favoriteSummoners[0].name).toBe('test');
    expect(favoriteSummoners[0].tier).toBe('test');
    expect(favoriteSummoners[0].win).toBe(1);
    expect(favoriteSummoners[0].lose).toBe(1);
    expect(favoriteSummoners[0].profileIconId).toBe(6);
    expect(favoriteSummoners[0].puuid).toBe('test');
    expect(favoriteSummoners[0].summonerId).toBe('test22222');
    expect(favoriteSummoners[0].leaguePoint).toBe(1);
    expect(favoriteSummoners[0].rank).toBe('test');
  });
});
