import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggingModule } from './common/logging/logging.module';
import { ExceptionModule } from './common/exceptions/exception.module';
import { ConfigModule } from '@nestjs/config';
import { validationSchema } from './config/validationSchema';
import authConfig from './config/authConfig';
import databaseConfig from './config/databaseConfig';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`${__dirname}/config/env/.${process.env.NODE_ENV}.env`],
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
