import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggingModule } from '../../../libs/common-config/src/logging/logging.module';
import { ExceptionModule } from '../../../libs/common-config/src/exceptions/exception.module';
import { ConfigModule } from '@nestjs/config';
import { validationSchema } from '../../../libs/common-config/src/config/validationSchema';
import authConfig from '../../../libs/common-config/src/config/authConfig';
import databaseConfig from '../../../libs/common-config/src/config/databaseConfig';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [databaseConfig, authConfig],
      isGlobal: true,
      validationSchema,
    }),
    LoggingModule,
    ExceptionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
