import { RecordModule } from '@app/entity/domain/record/RecordModule';
import { AuthApiService } from './../../../../src/auth/AuthApiService';
import { Test, TestingModule } from '@nestjs/testing';
import { ApiAppModule } from '../../../../src/ApiAppModule';
import { AuthApiController } from '../../../../src/auth/AuthApiController';

describe('AuthApiController', () => {
  let controller: AuthApiController;
  let service: AuthApiService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [RecordModule, ApiAppModule],
    }).compile();

    controller = module.get<AuthApiController>(AuthApiController);
    service = module.get<AuthApiService>(AuthApiService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should have service', () => {
    expect(service).toBeDefined();
  });
});
