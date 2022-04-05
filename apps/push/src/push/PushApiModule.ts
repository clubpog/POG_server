import { Module } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import { getWinstonLogger } from '@app/common-config/getWinstonLogger';
import { PushApiController } from './PushApiController';
import { PushApiService } from './PushApiService';
import { getBullQueue } from '../../../../libs/entity/queue/getBullQueue';
import { PushApiConsumer } from './PushApiConsumer';
import { RedisModule } from 'nestjs-redis';
import { RedisModuleConfig } from '../../../../libs/entity/config/redisConfig';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    WinstonModule.forRoot(getWinstonLogger(process.env.NODE_ENV, 'push')),
    getBullQueue(),
    RedisModule.register(RedisModuleConfig),
    ScheduleModule.forRoot(),
  ],
  controllers: [PushApiController],
  providers: [PushApiService, PushApiConsumer],
  exports: [getBullQueue()],
})
export class PushApiModule {}
