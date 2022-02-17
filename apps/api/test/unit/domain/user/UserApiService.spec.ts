import { FavoriteModule } from '@app/entity/domain/favorite/FavoriteModule';
import { ApiAppModule } from './../../../../src/ApiAppModule';
import { Test, TestingModule } from '@nestjs/testing';
import { UserApiService } from '../../../../src/user/UserApiService';

describe('UserApiService', () => {
  let service: UserApiService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [FavoriteModule, ApiAppModule],
    }).compile();

    service = module.get<UserApiService>(UserApiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
