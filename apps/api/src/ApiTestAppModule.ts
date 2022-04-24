import { getTestTypeOrmModule } from '../../../libs/entity/getTestTypeOrmModule';
import { HealthCheckController } from './health-check/HealthCheckController';
import { LoggingModule } from '@app/common-config/logging/logging.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TerminusModule } from '@nestjs/terminus';
import { HttpModule } from '@nestjs/axios';

import { AuthApiModule } from './auth/AuthApiModule';
import { UserApiModule } from './user/UserApiModule';
import { FavoriteSummonerApiModule } from './favoriteSummoner/FavoriteSummonerApiModule';
import { SummonerRecordApiModule } from './summonerRecord/SummonerRecordApiModule';
import { ValidationSchema } from '@app/common-config/config/validationSchema';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: ValidationSchema,
    }),
    getTestTypeOrmModule(),
    LoggingModule,
    AuthApiModule,
    UserApiModule,
    FavoriteSummonerApiModule,
    SummonerRecordApiModule,
    TerminusModule,
    HttpModule,
  ],
  controllers: [HealthCheckController],
})
export class ApiTestAppModule {}
