import { TestUtils } from './../testUtils';
import request from 'supertest';

import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { ApiTestAppModule } from '../ApiTestAppModule';
import { getConnection, Repository } from 'typeorm';
import { SetNestApp } from '@app/common-config/setNestApp';
import { User } from '@app/entity/domain/user/User.entity';

import { getRepositoryToken } from '@nestjs/typeorm';
import { ResponseEntity } from '@app/common-config/response/ResponseEntity';
import { FavoriteSummoner } from '@app/entity/domain/favoriteSummoner/FavoriteSummoner.entity';
import { SummonerRecord } from '@app/entity/domain/summonerRecord/SummonerRecord.entity';

describe('UserApiController (e2e)', () => {
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

  it('/fcmToken (PUT)', async () => {
    const firebaseToken = 'test1';

    const res = await request(app.getHttpServer())
      .put('/user/fcmToken')
      .set('Authorization', `Bearer ${userToken}`)
      .send({
        firebaseToken,
      })
      .expect(HttpStatus.OK);

    const body: ResponseEntity<string> = res.body;
    expect(body.statusCode).toBe(ResponseEntity.OK().statusCode);
    expect(body.message).toBe('FCM 토큰 수정에 성공했습니다.');

    const user = await userRepository.findOne();
    expect(user.firebaseToken).toBe(firebaseToken);
  });

  it('/fcmToken 시 firebaseToken이 없으면 벨리데이션 에러가 발생한다', async () => {
    const res = await request(app.getHttpServer())
      .put('/user/fcmToken')
      .set('Authorization', `Bearer ${userToken}`)
      .send()
      .expect(HttpStatus.BAD_REQUEST);

    const body: ResponseEntity<string> = res.body;
    expect(body.data[0]['constraints'][0]['message']).toBe(
      'firebaseToken must be a string',
    );
    expect(body.data[0]['constraints'][1]['message']).toBe(
      'firebaseToken should not be empty',
    );
  });

  it('/fcmToken 시 userToken이 없으면 Unauthorized 에러가 발생한다', async () => {
    const res = await request(app.getHttpServer())
      .put('/user/fcmToken')
      .send()
      .expect(HttpStatus.UNAUTHORIZED);

    const body: ResponseEntity<string> = res.body;
    expect(body.statusCode).toBe(ResponseEntity.UNAUTHORIZED().statusCode);
    expect(body.message).toBe(ResponseEntity.UNAUTHORIZED().message);
    expect(body.data).toBe(ResponseEntity.UNAUTHORIZED().data);
  });

  it('/push/v1 (PUT)', async () => {
    const isPush = true;

    const res = await request(app.getHttpServer())
      .put('/user/push/v1')
      .set('Authorization', `Bearer ${userToken}`)
      .send({
        isPush,
      })
      .expect(HttpStatus.OK);

    const body: ResponseEntity<string> = res.body;
    expect(body.statusCode).toBe(ResponseEntity.OK().statusCode);
    expect(body.message).toBe('푸시알림 허용 여부 수정에 성공했습니다.');

    const user = await userRepository.findOne();
    expect(user.isPush).toBe(isPush);
  });

  it('/push 시 userToken이 없으면 Unauthorized 에러가 발생한다', async () => {
    const res = await request(app.getHttpServer())
      .put('/user/push/v1')
      .send()
      .expect(HttpStatus.UNAUTHORIZED);

    const body: ResponseEntity<string> = res.body;
    expect(body.statusCode).toBe(ResponseEntity.UNAUTHORIZED().statusCode);
    expect(body.message).toBe(ResponseEntity.UNAUTHORIZED().message);
    expect(body.data).toBe(ResponseEntity.UNAUTHORIZED().data);
  });

  it('/push 시 isPush 값이 없으면 벨리데이션 에러가 발생한다', async () => {
    const res = await request(app.getHttpServer())
      .put('/user/push/v1')
      .set('Authorization', `Bearer ${userToken}`)
      .send()
      .expect(HttpStatus.BAD_REQUEST);

    const body: ResponseEntity<string> = res.body;
    expect(body.data[0]['constraints'][0]['message']).toBe(
      'isPush must be a boolean value',
    );
    expect(body.data[0]['constraints'][1]['message']).toBe(
      'isPush should not be empty',
    );
  });
});
