import { PushApiModule } from './push/PushApiModule';
import { getBullModule } from '../../../libs/entity/getBullModule';
import { HealthCheckController } from './health-check/HealthCheckController';
import { getTypeOrmModule } from '../../../libs/entity/getTypeOrmModule';
import { LoggingModule } from '@app/common-config/logging/logging.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TerminusModule } from '@nestjs/terminus';
import { HttpModule } from '@nestjs/axios';

import { BullMonitorModule } from '../../../libs/entity/queue/src/bull-monitor/BullMonitorModule';
import { ValidationSchema } from '@app/common-config/config/validationSchema';
import { SentryModule } from '@app/common-config/sentry/SentryModule';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: ValidationSchema,
    }),
    getTypeOrmModule(),
    getBullModule(),
    BullMonitorModule,
    LoggingModule,
    TerminusModule,
    HttpModule,
    PushApiModule,
    SentryModule,
  ],
  controllers: [HealthCheckController],
})
export class PushAppModule {}
