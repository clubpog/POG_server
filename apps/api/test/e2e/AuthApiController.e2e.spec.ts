import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { ApiAppModule } from '../../src/ApiAppModule';
import { getConnection, Repository } from 'typeorm';
import { SetNestApp } from '@app/common-config/setNextWebApp';
import { User } from '@app/entity/domain/user/User.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ResponseEntity } from '@app/common-config/response/ResponseEntity';
import { genSalt, hash } from 'bcrypt';

describe('AuthApiController (e2e)', () => {
  let app: INestApplication;
  let userRepository: Repository<User>;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ApiAppModule],
    }).compile();

    app = module.createNestApplication();
    userRepository = module.get(getRepositoryToken(User));

    SetNestApp(app); // ClassSerializerInterceptor 적용
    await app.init();
  });

  afterAll(async () => {
    await userRepository.clear();
    await getConnection().close();
  });

  // afterEach(async () => {
  //   await userRepository.clear();
  // });

  it('/signup (POST)', async () => {
    const userId = 'test';
    const password = 'test';
    const deviceId = 'test';
    const firebaseToken = 'test';

    const res = await request(app.getHttpServer()).post('/auth/signup').send({
      userId,
      password,
      deviceId,
      firebaseToken,
    });

    expect(res.status).toBe(HttpStatus.CREATED);

    const body: ResponseEntity<string> = res.body;
    expect(body.statusCode).toBe(ResponseEntity.CREATED().statusCode);

    const user = await userRepository.findOne();
    expect(user.userId).toBe(userId);
    expect(
      password !== (await hash(user.password, await genSalt())),
    ).toBeTruthy();
    expect(user.deviceId).toBe(deviceId);
    expect(user.firebaseToken).toBe(firebaseToken);
  });

  it('/signup 시 이미 가입되어 있는 아이디를 입력하면 에러가 발생한다.', async () => {
    const userId = 'test';
    const password = 'test';
    const deviceId = 'test';
    const firebaseToken = 'test';

    const res = await request(app.getHttpServer()).post('/auth/signup').send({
      userId,
      password,
      deviceId,
      firebaseToken,
    });

    expect(res.status).toBe(HttpStatus.CREATED);

    const body: ResponseEntity<string> = res.body;
    const testBody: ResponseEntity<string> =
      ResponseEntity.ERROR_WITH('회원가입에 실패했습니다.');
    expect(body.statusCode).toBe(testBody.statusCode);
    expect(body.message).toBe(testBody.message);
    expect(body.data).toBe(testBody.data);
  });

  it('/signup 시 userId가 없으면 벨리데이션 에러가 발생한다', async () => {
    const password = 'test';
    const deviceId = 'test';
    const firebaseToken = 'test';

    const res = await request(app.getHttpServer()).post('/auth/signup').send({
      password,
      deviceId,
      firebaseToken,
    });

    expect(res.status).toBe(HttpStatus.BAD_REQUEST);
    const body: ResponseEntity<string> = res.body;
    expect(body.data[0]['constraints'][0]['message']).toBe(
      'userId must be a string',
    );
    expect(body.data[0]['constraints'][1]['message']).toBe(
      'userId should not be empty',
    );
  });
});
