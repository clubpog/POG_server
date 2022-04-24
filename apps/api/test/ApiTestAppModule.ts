import { getTestTypeOrmModule } from '../../../libs/entity/getTestTypeOrmModule';
import { HealthCheckController } from '../src/health-check/HealthCheckController';
import { LoggingModule } from '@app/common-config/logging/logging.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TerminusModule } from '@nestjs/terminus';
import { HttpModule } from '@nestjs/axios';

import { AuthApiModule } from '../src/auth/AuthApiModule';
import { UserApiModule } from '../src/user/UserApiModule';
import { FavoriteSummonerApiModule } from '../src/favoriteSummoner/FavoriteSummonerApiModule';
import { SummonerRecordApiModule } from '../src/summonerRecord/SummonerRecordApiModule';
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
