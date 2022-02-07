import { Module } from '@nestjs/common';
import { UserService } from './UserApiService';
import { UserController } from './UserApiController';

@Module({
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
