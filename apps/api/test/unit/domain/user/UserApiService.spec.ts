import { ApiAppModule } from './../../../../src/ApiAppModule';
import { Test, TestingModule } from '@nestjs/testing';
import { UserApiService } from '../../../../src/user/UserApiService';

describe('UserApiService', () => {
  let service: UserApiService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ApiAppModule],
    }).compile();

    service = module.get<UserApiService>(UserApiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
