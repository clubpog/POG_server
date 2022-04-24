import { TestUtils } from '../testUtils';
import request from 'supertest';

import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication, Post } from '@nestjs/common';
import { ApiTestAppModule } from '../ApiTestAppModule';
import { getConnection, Repository } from 'typeorm';
import { SetNestApp } from '@app/common-config/setNestApp';
import { User } from '@app/entity/domain/user/User.entity';

import { getRepositoryToken } from '@nestjs/typeorm';
import { ResponseEntity } from '@app/common-config/response/ResponseEntity';
import { FavoriteSummoner } from '@app/entity/domain/favoriteSummoner/FavoriteSummoner.entity';
import { SummonerRecord } from '@app/entity/domain/summonerRecord/SummonerRecord.entity';

describe('FavoriteSummonerApiController (e2e)', () => {
  let app: INestApplication;
  let userRepository: Repository<User>;
  let favoriteRepository: Repository<FavoriteSummoner>;
  let summonerRecordRepository: Repository<SummonerRecord>;
  let testUtils: TestUtils;
  let userToken: string;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ApiTestAppModule, TestUtils],
    }).compile();

    app = module.createNestApplication();
    userRepository = module.get(getRepositoryToken(User));
    favoriteRepository = module.get(getRepositoryToken(FavoriteSummoner));
    summonerRecordRepository = module.get(getRepositoryToken(SummonerRecord));
    testUtils = module.get<TestUtils>(TestUtils);

    SetNestApp(app); // ClassSerializerInterceptor 적용
    await app.init();
    await userRepository.delete({});
    await favoriteRepository.delete({});
    await summonerRecordRepository.delete({});
    userToken = await testUtils.getDefaultUserToken();
  });

  afterAll(async () => {
    await getConnection().close();
  });

  afterEach(async () => {
    await userRepository.delete({});
    await favoriteRepository.delete({});
    await summonerRecordRepository.delete({});
    userToken = await testUtils.getDefaultUserToken();
  });

  it('/favoriteSummoner (POST)', async () => {
    const res = await request(app.getHttpServer())
      .post('/favoriteSummoner/v1')
      .set('Authorization', `Bearer ${userToken}`)
      .send({
        name: 'Hide on bush',
        tier: 'CHALLENGER',
        win: 100,
        lose: 100,
        profileIconId: 6,
        puuid:
          'abHOdi3PiSiMUH48LtAhMl-V1uxthjVEvPRTw8quWhsg70HuF6vT5UAfUsf3nLBvPgF90CLOV3NIow',
        summonerId: 'Yr6IbOSrmcKdZ2EVfFW5RpeAS57WF8t6dFz_A2NncjVGrA',
        leaguePoint: 564,
        rank: 'I',
      })
      .expect(HttpStatus.CREATED);

    const body: ResponseEntity<string> = res.body;
    expect(body.statusCode).toBe(ResponseEntity.CREATED().statusCode);
    expect(body.message).toBe('소환사 즐겨찾기 추가에 성공했습니다.');

    const summonerRecord = await summonerRecordRepository.findOne();
    expect(summonerRecord.name).toBe('Hide on bush');
    expect(summonerRecord.tier).toBe('CHALLENGER');
    expect(summonerRecord.win).toBe(100);
    expect(summonerRecord.lose).toBe(100);
    expect(summonerRecord.profileIconId).toBe(6);
    expect(summonerRecord.puuid).toBe(
      'abHOdi3PiSiMUH48LtAhMl-V1uxthjVEvPRTw8quWhsg70HuF6vT5UAfUsf3nLBvPgF90CLOV3NIow',
    );
    expect(summonerRecord.summonerId).toBe(
      'Yr6IbOSrmcKdZ2EVfFW5RpeAS57WF8t6dFz_A2NncjVGrA',
    );
    expect(summonerRecord.leaguePoint).toBe(564);
    expect(summonerRecord.rank).toBe('I');

    await request(app.getHttpServer())
      .delete('/favoriteSummoner/v1')
      .set('Authorization', `Bearer ${userToken}`)
      .send({
        summonerId: 'Yr6IbOSrmcKdZ2EVfFW5RpeAS57WF8t6dFz_A2NncjVGrA',
      })
      .expect(HttpStatus.OK);
  });

  it('/favoriteSummoner/v1 시 userToken이 없으면 Unauthorized 에러가 발생한다', async () => {
    const res = await request(app.getHttpServer())
      .post('/favoriteSummoner/v1')
      .send()
      .expect(HttpStatus.UNAUTHORIZED);

    const body: ResponseEntity<string> = res.body;
    expect(body.statusCode).toBe(ResponseEntity.UNAUTHORIZED().statusCode);
    expect(body.message).toBe(ResponseEntity.UNAUTHORIZED().message);
    expect(body.data).toBe(ResponseEntity.UNAUTHORIZED().data);
  });

  it('/favoriteSummoner/v1 시 summonerId가 없으면 벨리데이션 에러가 발생한다', async () => {
    const res = await request(app.getHttpServer())
      .post('/favoriteSummoner/v1')
      .set('Authorization', `Bearer ${userToken}`)
      .send({
        name: 'Hide on bush',
        tier: 'CHALLENGER',
        win: 100,
        lose: 100,
        profileIconId: 6,
        puuid:
          'abHOdi3PiSiMUH48LtAhMl-V1uxthjVEvPRTw8quWhsg70HuF6vT5UAfUsf3nLBvPgF90CLOV3NIow',
        leaguePoint: 564,
        rank: 'I',
      })
      .expect(HttpStatus.BAD_REQUEST);

    const body: ResponseEntity<string> = res.body;
    expect(body.data[0]['constraints'][0]['message']).toBe(
      'summonerId must be a string',
    );
    expect(body.data[0]['constraints'][1]['message']).toBe(
      'summonerId should not be empty',
    );
  });

  it('/favoriteSummoner/v1 소환사 즐겨찾기 한도가 초과되었습니다. (POST)', async () => {
    await request(app.getHttpServer())
      .post('/favoriteSummoner/v1')
      .set('Authorization', `Bearer ${userToken}`)
      .send({
        name: 'Hide on bush',
        tier: 'CHALLENGER',
        win: 100,
        lose: 100,
        profileIconId: 6,
        puuid: 'test1',
        summonerId: 'test1',
        leaguePoint: 564,
        rank: 'I',
      });

    await request(app.getHttpServer())
      .post('/favoriteSummoner/v1')
      .set('Authorization', `Bearer ${userToken}`)
      .send({
        name: 'Hide on bush',
        tier: 'CHALLENGER',
        win: 100,
        lose: 100,
        profileIconId: 6,
        puuid: 'test2',
        summonerId: 'test2',
        leaguePoint: 564,
        rank: 'I',
      });
    await request(app.getHttpServer())
      .post('/favoriteSummoner/v1')
      .set('Authorization', `Bearer ${userToken}`)
      .send({
        name: 'Hide on bush',
        tier: 'CHALLENGER',
        win: 100,
        lose: 100,
        profileIconId: 6,
        puuid: 'test3',
        summonerId: 'test3',
        leaguePoint: 564,
        rank: 'I',
      });
    await request(app.getHttpServer())
      .post('/favoriteSummoner/v1')
      .set('Authorization', `Bearer ${userToken}`)
      .send({
        name: 'Hide on bush',
        tier: 'CHALLENGER',
        win: 100,
        lose: 100,
        profileIconId: 6,
        puuid: 'test4',
        summonerId: 'test4',
        leaguePoint: 564,
        rank: 'I',
      });
    await request(app.getHttpServer())
      .post('/favoriteSummoner/v1')
      .set('Authorization', `Bearer ${userToken}`)
      .send({
        name: 'Hide on bush',
        tier: 'CHALLENGER',
        win: 100,
        lose: 100,
        profileIconId: 6,
        puuid: 'test5',
        summonerId: 'test5',
        leaguePoint: 564,
        rank: 'I',
      });
    const res = await request(app.getHttpServer())
      .post('/favoriteSummoner/v1')
      .set('Authorization', `Bearer ${userToken}`)
      .send({
        name: 'Hide on bush',
        tier: 'CHALLENGER',
        win: 100,
        lose: 100,
        profileIconId: 6,
        puuid:
          'abHOdi3PiSiMUH48LtAhMl-V1uxthjVEvPRTw8quWhsg70HuF6vT5UAfUsf3nLBvPgF90CLOV3NIow',
        summonerId: 'Yr6IbOSrmcKdZ2EVfFW5RpeAS57WF8t6dFz_A2NncjVGrA',
        leaguePoint: 564,
        rank: 'I',
      })
      .expect(HttpStatus.FORBIDDEN);

    const body: ResponseEntity<string> = res.body;
    expect(body.statusCode).toBe(ResponseEntity.FORBIDDEN().statusCode);
    expect(body.message).toBe('Forbidden');
    expect(body.data).toBe('즐겨찾기 한도가 초과되었습니다.');
  });
});
