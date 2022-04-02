import { CacheModule } from '@nestjs/common';
import * as dotenv from 'dotenv';
import * as redisStore from 'cache-manager-ioredis';

dotenv.config();

const [host, port] =
  process.env.NODE_ENV === 'production'
    ? [process.env.REDIS_HOST, process.env.REDIS_PORT]
    : [process.env.REDIS_TEST_HOST, process.env.REDIS_TEST_PORT];

export function getCacheModule() {
  return CacheModule.register({
    store: redisStore,
    host,
    port: Number(port),
  });
}
