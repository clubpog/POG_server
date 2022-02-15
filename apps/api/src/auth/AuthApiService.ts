import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { User } from '@app/entity/domain/user/User.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthApiService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async signup(signupUser: User): Promise<void> {
    await this.create(signupUser);
  }

  async create(user: User): Promise<void> {
    await this.userRepository.save(user);
  }
}
