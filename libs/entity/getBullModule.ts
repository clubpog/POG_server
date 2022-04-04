import { BullModule } from '@nestjs/bull';
import { RedisConfig } from './config/redisConfig';

export function getBullModule() {
  return BullModule.forRoot(RedisConfig);
}
