import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { setNestApp } from '../../../libs/common-config/src/setNextWebApp';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    // setNestApp(app);
    await app.init();
  });

  it('/ (GET)', async () => {
    const res = await request(app.getHttpServer()).get('/');

    expect(res.status).toBe(200);
    const { data } = res.body;
    expect(data.firstName).toBe('Kildong');
    expect(data.lastName).toBe('Hong');
  });

  it('/user (GET)', async () => {
    const res = await request(app.getHttpServer()).get('/user');

    expect(res.status).toBe(200);
    const { data } = res.body;
    expect(data._firstName).toBe('Kildong');
    expect(data._lastName).toBe('Hong');
  });
});
