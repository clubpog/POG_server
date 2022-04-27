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
import { EventStoreServiceImplement } from '../../../../../../libs/cache/EventStoreService';
import { UserReq } from '../../../../src/user/dto/UserReq.dto';
import { FavoriteSummonerReq } from '../../../../src/favoriteSummoner/dto/FavoriteSummonerReq.dto';

describe('FavoriteSummonerApiService', () => {
  let favoriteSummonerRepository: Repository<FavoriteSummoner>;
  let sut: FavoriteSummonerApiService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        FavoriteSummonerModule,
        SummonerRecordModule,
        SummonerRecordApiModule,
        ConfigModule.forRoot({
          isGlobal: true,
          validationSchema: ValidationSchema,
        }),
        getTestTypeOrmModule(),
      ],
      providers: [
        FavoriteSummonerApiService,
        FavoriteSummonerApiRepository,
        FavoriteSummonerApiQueryRepository,
        {
          provide: EInfrastructureInjectionToken.EVENT_STORE.name,
          useClass: EventStoreServiceImplement,
        },
      ],
    }).compile();

    favoriteSummonerRepository = module.get('FavoriteSummonerRepository');
    sut = module.get<FavoriteSummonerApiService>(FavoriteSummonerApiService);

    await favoriteSummonerRepository.delete({});
  });

  afterAll(async () => {
    await getConnection().close();
  });

  afterEach(async () => {
    await favoriteSummonerRepository.delete({});
  });

  it('createFavoriteSummoner', async () => {
    //given
    const deviceId = 'test';
    const userId = 1;

    //when
    await sut.createFavoriteSummonerV1(
      await UserReq.of(deviceId, userId),
      await FavoriteSummonerReq.of(
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
});
