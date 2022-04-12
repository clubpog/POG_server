import * as dotenv from 'dotenv';
import { QueueOptions } from 'bull';

dotenv.config();

const [host, port] =
  process.env.NODE_ENV === 'production'
    ? [process.env.REDIS_HOST, process.env.REDIS_PORT]
    : [process.env.REDIS_TEST_HOST, process.env.REDIS_TEST_PORT];

export const RedisConfig: QueueOptions = {
  redis: { host, port: Number(port) },
};

export const RedisModuleConfig = {
  host,
  port: Number(port),
};
