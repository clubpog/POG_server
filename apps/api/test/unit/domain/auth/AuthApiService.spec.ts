import { UserApiService } from './../../../../src/user/UserApiService';
import { Test, TestingModule } from '@nestjs/testing';
import { ApiAppModule } from '../../../../src/ApiAppModule';
import { AuthApiService } from '../../../../src/auth/AuthApiService';

describe('AuthApiService', () => {
  let authApiService: AuthApiService;
  let userApiService: UserApiService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ApiAppModule],
    }).compile();

    authApiService = module.get<AuthApiService>(AuthApiService);
    userApiService = module.get<UserApiService>(UserApiService);
  });

  it('should be defined', () => {
    expect(authApiService).toBeDefined();
  });

  it('should be defined', () => {
    expect(userApiService).toBeDefined();
  });
});
