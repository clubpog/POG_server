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
import { EventStoreServiceImplement } from '../../../../libs/cache/EventStoreService';
import { PushJobService } from '@app/common-config/job/push/PushJobService';
import { EInfrastructureInjectionToken } from '@app/common-config/enum/InfrastructureInjectionToken';
import { EApplicationInjectionToken } from '@app/common-config/enum/ApplicationInjectionToken';

const infrastructure: Provider[] = [
  {
    provide: EInfrastructureInjectionToken.EVENT_STORE.name,
    useClass: EventStoreServiceImplement,
  },
];

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
