import { Injectable } from '@nestjs/common';
import request from 'supertest';
import { ApiTestAppModule } from './ApiTestAppModule';
import { Test, TestingModule } from '@nestjs/testing';
import { SetNestApp } from '@app/common-config/setNestApp';

@Injectable()
export class TestUtils {
  async getDefaultUserToken(): Promise<string> {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ApiTestAppModule],
    }).compile();

    const app = module.createNestApplication();
    SetNestApp(app);
    await app.init();

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
      });

    return res.body.data['accessToken'];
  }
}
