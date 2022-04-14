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
import { PushApiInjectionToken } from './PushApiInjectionToken';
import { EventStoreServiceImplement } from '../../../../libs/cache/EventStoreService';
import { PushJobService } from '@app/common-config/job/push/PushJobService';

const infrastructure: Provider[] = [
  {
    provide: PushApiInjectionToken.EVENT_STORE,
    useClass: EventStoreServiceImplement,
  },
];

const application: Provider[] = [
  {
    provide: PushApiInjectionToken.PUSH_JOB,
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
  ],
  controllers: [PushApiController],
  providers: [
    PushApiService,
    PushApiConsumer,
    ...infrastructure,
    ...application,
  ],
  exports: [getBullQueue()],
})
export class PushApiModule {}
