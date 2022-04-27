import { RiotApiJobModule } from './../../../../libs/common-config/src/job/riot/RiotApiJobModule';
import { SummonerRecordApiModule } from './../../../api/src/summonerRecord/SummonerRecordApiModule';
import { PushJobModule } from '../../../../libs/common-config/src/job/push/PushJobModule';
import { Module, Provider } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import { getWinstonLogger } from '@app/common-config/getWinstonLogger';
import { PushApiController } from './PushApiController';
import { PushApiService } from './PushApiService';
import { getBullQueue } from '../../../../libs/entity/queue/getBullQueue';
import { PushApiConsumer } from './PushApiConsumer';
import { ScheduleModule } from '@nestjs/schedule';
import { PushJobService } from '@app/common-config/job/push/PushJobService';
import { EApplicationInjectionToken } from '@app/common-config/enum/ApplicationInjectionToken';
import { EventStoreModule } from '../../../../libs/cache/EventStoreModule';

const application: Provider[] = [
  {
    provide: EApplicationInjectionToken.PUSH_JOB.name,
    useClass: PushJobService,
  },
];

@Module({
  imports: [
    PushJobModule,
    RiotApiJobModule,
    WinstonModule.forRoot(getWinstonLogger(process.env.NODE_ENV, 'push')),
    getBullQueue(),
    ScheduleModule.forRoot(),
    SummonerRecordApiModule,
    EventStoreModule,
  ],
  controllers: [PushApiController],
  providers: [PushApiService, PushApiConsumer, ...application],
  exports: [getBullQueue()],
})
export class PushApiModule {}
