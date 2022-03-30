import { BullModule } from '@nestjs/bull';
import * as RedisConfig from './config/redisConfig';

export function getBullModule() {
  return BullModule.forRoot(RedisConfig);
}
