import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ApiAppModule } from './../../../../src/ApiAppModule';
import { Test, TestingModule } from '@nestjs/testing';
import { UserApiService } from '../../../../src/user/UserApiService';
import { User } from '@app/entity/domain/user/user.entity';

describe('UserApiService', () => {
  let service: UserApiService;
  let userRepository: Repository<User>;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ApiAppModule],
    }).compile();

    service = module.get<UserApiService>(UserApiService);
    userRepository = module.get(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be defined', () => {
    expect(userRepository).toBeDefined();
  });
});
