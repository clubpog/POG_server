import { UserApiRepository } from './UserApiRepository';
import { UserApiQueryRepository } from './UserApiQueryRepository';
import { Module } from '@nestjs/common';
import { UserApiService } from './UserApiService';
import { UserApiController } from './UserApiController';
import { UserModule } from '@app/entity/domain/user/UserModule';
import { WinstonModule } from 'nest-winston';
import { getWinstonLogger } from '@app/common-config/getWinstonLogger';

@Module({
  imports: [
    UserModule,
    WinstonModule.forRoot(getWinstonLogger(process.env.NODE_ENV, 'api')),
  ],
  controllers: [UserApiController],
  providers: [UserApiService, UserApiQueryRepository, UserApiRepository],
  exports: [UserApiQueryRepository, UserApiRepository],
})
export class UserApiModule {}
