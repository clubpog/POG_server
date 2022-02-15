import { TestDatabaseConfig } from './../../../libs/common-config/src/config/testDatabaseConfig';
import { HealthCheckController } from './health-check/HealthCheckController';
import { getRealTypeOrmModule } from '../../../libs/entity/getTypeOrmModule';
import { getPgTestTypeOrmModule } from '../../../libs/entity/test/getPgTestTypeOrmModule';
import { LoggingModule } from '@app/common-config/logging/logging.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TerminusModule } from '@nestjs/terminus';
import { HttpModule } from '@nestjs/axios';

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
      load: [DatabaseConfig, AuthConfig, TestDatabaseConfig],
      isGlobal: true,
      validationSchema: ValidationSchema,
    }),
    getRealTypeOrmModule(),
    // getPgTestTypeOrmModule(),
    LoggingModule,
    AuthApiModule,
    UserApiModule,
    TerminusModule,
    HttpModule,
  ],
  controllers: [HealthCheckController],
})
export class ApiAppModule {}
