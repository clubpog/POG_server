import request from 'supertest';

import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { ApiTestAppModule } from '../../src/ApiTestAppModule';
import { getConnection, Repository } from 'typeorm';
import { SetNestApp } from '@app/common-config/setNestApp';
import { User } from '@app/entity/domain/user/User.entity';

import { getRepositoryToken } from '@nestjs/typeorm';
import { ResponseEntity } from '@app/common-config/response/ResponseEntity';
import { FavoriteSummoner } from '@app/entity/domain/favoriteSummoner/FavoriteSummoner.entity';
import { SummonerRecord } from '@app/entity/domain/summonerRecord/SummonerRecord.entity';

describe('AuthApiController (e2e)', () => {
  let app: INestApplication;
  let userRepository: Repository<User>;
  let favoriteRepository: Repository<FavoriteSummoner>;
  let summonerRecordRepository: Repository<SummonerRecord>;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ApiTestAppModule],
    }).compile();

    app = module.createNestApplication();
    userRepository = module.get(getRepositoryToken(User));
    favoriteRepository = module.get(getRepositoryToken(FavoriteSummoner));
    summonerRecordRepository = module.get(getRepositoryToken(SummonerRecord));

    SetNestApp(app); // ClassSerializerInterceptor 적용
    await app.init();
    await userRepository.delete({});
    await favoriteRepository.delete({});
    await summonerRecordRepository.delete({});
  });

  afterAll(async () => {
    await getConnection().close();
  });

  afterEach(async () => {
    await userRepository.delete({});
    await favoriteRepository.delete({});
    await summonerRecordRepository.delete({});
  });

  it('/signup (POST)', async () => {
    const deviceId = 'test';
    const firebaseToken = 'test';

    const res = await request(app.getHttpServer())
      .post('/auth/signup/v1')
      .send({
        deviceId,
        firebaseToken,
      })
      .expect(HttpStatus.CREATED);

    const body: ResponseEntity<string> = res.body;
    expect(body.statusCode).toBe(ResponseEntity.CREATED().statusCode);

    const user = await userRepository.findOne();
    expect(user.deviceId).toBe(deviceId);
    expect(user.firebaseToken).toBe(firebaseToken);
    expect(user.isPush).toBe(false);
  });

  it('/signup 시 이미 가입되어 있는 아이디를 입력하면 에러가 발생한다.', async () => {
    const deviceId = 'test';
    const firebaseToken = 'test';

    await request(app.getHttpServer()).post('/auth/signup/v1').send({
      deviceId,
      firebaseToken,
    });
    const res = await request(app.getHttpServer())
      .post('/auth/signup/v1')
      .send({
        deviceId,
        firebaseToken,
      })
      .expect(HttpStatus.UNPROCESSABLE_ENTITY);

    const body: ResponseEntity<string> = res.body;
    const testBody: ResponseEntity<string> = ResponseEntity.UNPROCESSABLE_WITH(
      '이미 DB에 있는 deviceId를 입력했습니다.',
    );
    expect(body.statusCode).toBe(testBody.statusCode);
    expect(body.message).toBe(testBody.message);
    expect(body.data).toBe(testBody.data);
  });

  it('/signup 시 deviceId가 없으면 벨리데이션 에러가 발생한다', async () => {
    const firebaseToken = 'test';

    const res = await request(app.getHttpServer())
      .post('/auth/signup/v1')
      .send({
        firebaseToken,
      })
      .expect(HttpStatus.BAD_REQUEST);

    const body: ResponseEntity<string> = res.body;
    expect(body.data[0]['constraints'][0]['message']).toBe(
      'deviceId must be a string',
    );
    expect(body.data[0]['constraints'][1]['message']).toBe(
      'deviceId should not be empty',
    );
  });

  it('/signin (POST)', async () => {
    const deviceId = 'test';
    const firebaseToken = 'test';

    await request(app.getHttpServer()).post('/auth/signup/v1').send({
      deviceId,
      firebaseToken,
    });

    const res = await request(app.getHttpServer())
      .post('/auth/signin/v1')
      .send({
        deviceId,
      })
      .expect(HttpStatus.OK);

    const body: ResponseEntity<string> = res.body;

    expect(body.statusCode).toBe(ResponseEntity.OK().statusCode);
    expect(body.message).toBe('로그인에 성공했습니다.');
    expect(body.data).toBeDefined();
  });

  it('/signin 시 deviceId가 없으면 벨리데이션 에러가 발생한다', async () => {
    const res = await request(app.getHttpServer())
      .post('/auth/signin/v1')
      .send()
      .expect(HttpStatus.BAD_REQUEST);

    const body: ResponseEntity<string> = res.body;
    expect(body.data[0]['constraints'][0]['message']).toBe(
      'deviceId must be a string',
    );
    expect(body.data[0]['constraints'][1]['message']).toBe(
      'deviceId should not be empty',
    );
  });

  it('/signin 시 입력 받은 deviceId가 DB에 없으면 404 에러가 발생한다', async () => {
    const deviceId = 'test';

    const res = await request(app.getHttpServer())
      .post('/auth/signin/v1')
      .send({
        deviceId,
      })
      .expect(HttpStatus.NOT_FOUND);

    const body: ResponseEntity<string> = res.body;

    expect(body.statusCode).toBe(ResponseEntity.NOT_FOUND().statusCode);
    expect(body.message).toBe('Not Found');
    expect(body.data).toBe('입력된 deviceId가 존재하지 않습니다.');
  });
});
