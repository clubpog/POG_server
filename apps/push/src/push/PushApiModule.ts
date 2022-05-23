import { RiotApiJobService } from '@app/common-config/job/riot/RiotApiJobService';
import { PushApiTask } from './PushApiTask';
import {
  BullService,
  BullModule,
  BullTaskRegisterService,
} from '../../../../libs/entity/queue/src/lib';
import { RiotApiJobModule } from './../../../../libs/common-config/src/job/riot/RiotApiJobModule';
import { SummonerRecordApiModule } from '../summonerRecord/SummonerRecordApiModule';
import { PushJobModule } from '../../../../libs/common-config/src/job/push/PushJobModule';
import { Module, OnModuleInit, Provider } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import { getWinstonLogger } from '@app/common-config/getWinstonLogger';
import { PushApiController } from './PushApiController';
import { PushApiService } from './PushApiService';
import { ScheduleModule } from '@nestjs/schedule';
import { PushJobService } from '@app/common-config/job/push/PushJobService';
import { EApplicationInjectionToken } from '@app/common-config/enum/ApplicationInjectionToken';
import { EventStoreModule } from '../../../../libs/cache/EventStoreModule';
import { ModuleRef } from '@nestjs/core';
import { ConfigService } from '../../../../libs/entity/config/configService';
import { ChangedTierApiModule } from '../changedTier/ChangedTierApiModule';

const application: Provider[] = [
  {
    provide: EApplicationInjectionToken.PUSH_JOB.name,
    useClass: PushJobService,
  },
  {
    provide: EApplicationInjectionToken.RIOT_API_JOB.name,
    useClass: RiotApiJobService,
  },
  {
    provide: EApplicationInjectionToken.BULL_JOB.name,
    useClass: BullService,
  },
  {
    provide: EApplicationInjectionToken.PUSH_API_TASK.name,
    useClass: PushApiTask,
  },
];

@Module({
  imports: [
    PushJobModule,
    RiotApiJobModule,
    WinstonModule.forRoot(getWinstonLogger(process.env.NODE_ENV, 'push')),
    BullModule,
    ScheduleModule.forRoot(),
    SummonerRecordApiModule,
    ChangedTierApiModule,
    EventStoreModule,
  ],
  controllers: [PushApiController],
  providers: [...application, PushApiService, PushApiTask],
})
export class PushApiModule implements OnModuleInit {
  constructor(
    private readonly moduleRef: ModuleRef,
    private readonly taskRegister: BullTaskRegisterService,
    private readonly bullService: BullService,
  ) {}
  onModuleInit() {
    this.taskRegister.setModuleRef(this.moduleRef);
    this.taskRegister.register(PushApiTask, {
      queue: 'PushQueue',
      options: ConfigService.bullConfig(),
    });

    // const limiter: RateLimiter = {
    //   // Max number of jobs processed
    //   max: 5,
    //   // per duration in milliseconds
    //   duration: 1000,
    // };

    // const settings: AdvancedSettings = {
    //   // Key expiration time for job locks.
    //   lockDuration: 30000,
    //   // How often check for stalled jobs (use 0 for never checking).
    //   stalledInterval: 30000,
    //   // Max amount of times a stalled job will be re-processed.
    //   maxStalledCount: 1,
    //   // Poll interval for delayed jobs and added jobs.
    //   guardInterval: 5000,
    //   // delay before processing next job in case of internal error.
    //   retryProcessDelay: 5000,
    //   // A set of custom backoff strategies keyed by name.
    //   backoffStrategies: {},
    //   // A timeout for when the queue is in drained state (empty waiting for jobs).
    //   drainDelay: 5,
    // };

    // const defaultJobOptions = {
    //   // Optional priority value. ranges from 1 (highest priority) to MAX_INT  (lowest priority).
    //   // Note that using priorities has a slight impact on performance, so do not use it if not required.
    //   priority: 1,
    //   // An amount of miliseconds to wait until this job can be processed. Note that for accurate delays,
    //   // both server and clients should have their clocks synchronized. [optional].
    //   delay: 500,
    //   // The total number of attempts to try the job until it completes.
    //   attempts: 3,
    //   // if true, adds the job to the right of the queue instead of the left (default false)
    //   lifo: false,
    //   // The number of milliseconds after which the job should be fail with a timeout error [optional]
    //   timeout: 30000,
    //   // If true, removes the job when it successfully
    //   // completes. Default behavior is to keep the job in the completed set.
    //   removeOnComplete: false,
    //   // If true, removes the job when it fails after all attempts.
    //   // Default behavior is to keep the job in the failed set.
    //   removeOnFail: false,
    // };

    // const queueOptions: QueueOptions = {
    //   limiter,
    //   redis: {
    //     port: 6379,
    //     host: 'localhost',
    //   },
    //   prefix: 'my_prefix', // prefix for all queue keys.
    //   defaultJobOptions,
    //   settings,
    // };
  }
}
