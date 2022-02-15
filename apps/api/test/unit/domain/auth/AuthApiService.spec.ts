import { FavoriteModule } from '@app/entity/domain/favorite/FavoriteModule';
import { UserApiService } from './../../../../src/user/UserApiService';
import { Test, TestingModule } from '@nestjs/testing';
import { ApiAppModule } from '../../../../src/ApiAppModule';
import { AuthApiService } from '../../../../src/auth/AuthApiService';

describe('AuthApiService', () => {
  let authApiService: AuthApiService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [FavoriteModule, ApiAppModule],
    }).compile();

    authApiService = module.get<AuthApiService>(AuthApiService);
  });

  it('should be defined', () => {
    expect(authApiService).toBeDefined();
  });
});
