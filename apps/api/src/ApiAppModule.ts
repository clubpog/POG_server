import { getRealTypeOrmModule } from '../../../libs/entity/getTypeOrmModule';
// import { getPgTestTypeOrmModule } from '../../../libs/entity/test/getPgTestTypeOrmModule';
import { LoggingModule } from '@app/common-config/logging/logging.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import {
  AuthConfig,
  DatabaseConfig,
  ValidationSchema,
} from '@app/common-config/config';
import { AuthApiModule } from './auth/AuthApiModule';
import { UserApiModule } from './user/UserApiModule';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [DatabaseConfig, AuthConfig],
      isGlobal: true,
      validationSchema: ValidationSchema,
    }),
    getRealTypeOrmModule(),
    // getPgTestTypeOrmModule(),
    LoggingModule,
    AuthApiModule,
    UserApiModule,
  ],
})
export class ApiAppModule {}
