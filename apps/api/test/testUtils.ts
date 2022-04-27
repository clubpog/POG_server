import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import request from 'supertest';
import { ApiTestAppModule } from './ApiTestAppModule';
import { Test, TestingModule } from '@nestjs/testing';
import { SetNestApp } from '@app/common-config/setNestApp';
import { User } from '@app/entity/domain/user/User.entity';

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

  async createUser(): Promise<number> {
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

    await request(app.getHttpServer()).post('/auth/signin/v1').send({
      deviceId,
    });

    const userRepository: Repository<User> = module.get('UserRepository');
    const user = await userRepository.findOne();

    return user.id;
  }
}
