import { UserModule } from './../../../../libs/entity/src/domain/user/UserModule';
import { Module } from '@nestjs/common';
import { AuthApiService } from './AuthApiService';
import { AuthApiController } from './AuthApiController';
import { UserApiModule } from '../user/UserApiModule';
import { WinstonModule } from 'nest-winston';
import { getWinstonLogger } from '@app/common-config/getWinstonLogger';

@Module({
  imports: [
    UserModule,
    UserApiModule,
    WinstonModule.forRoot(getWinstonLogger(process.env.NODE_ENV, 'api')),
  ],
  controllers: [AuthApiController],
  providers: [AuthApiService],
  exports: [AuthApiService],
})
export class AuthApiModule {}
