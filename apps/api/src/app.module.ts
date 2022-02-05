import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { LoggingModule } from '@app/common-config/logging/logging.module';
import { ExceptionModule } from '@app/common-config/exceptions/exception.module';

import {
  AuthConfig,
  DatabaseConfig,
  ValidationSchema,
} from '@app/common-config/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { getRealTypeOrmModule } from '../../../libs/getTypeOrmModule';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [DatabaseConfig, AuthConfig],
      isGlobal: true,
      validationSchema: ValidationSchema,
    }),
    LoggingModule,
    ExceptionModule,
    getRealTypeOrmModule(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
