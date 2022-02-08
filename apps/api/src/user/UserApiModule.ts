import { Module } from '@nestjs/common';
import { UserApiService } from './UserApiService';
import { UserApiController } from './UserApiController';
import { UserModule } from '@app/entity/domain/user/UserModule';

@Module({
  imports: [UserModule],
  controllers: [UserApiController],
  providers: [UserApiService],
  exports: [UserApiService],
})
export class UserApiModule {}
