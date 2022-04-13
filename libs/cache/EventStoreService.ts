import { Injectable, Logger } from '@nestjs/common';
import Redis from 'ioredis';
import { RedisModuleConfig } from '../entity/config/redisConfig';
import { Event, EventStore } from './interface/integration';

@Injectable()
export class EventStoreServiceImplement implements EventStore {
  private readonly master: Redis;

  constructor() {
    this.master = new Redis(RedisModuleConfig).on(
      'error',
      this.failToConnectRedis,
    );
  }
  async save(event: Event): Promise<void> {
    await this.master.set(event.data.id, JSON.stringify(event.data));
  }

  // async set(key: string, value: string): Promise<void> {
  //   await this.master.set(key, value, 'EX', 1);
  // }

  // async get(key: string): Promise<string | null> {
  //   return this.master
  //     .get(key)
  //     .then(result => result)
  //     .catch(() => null);
  // }

  private failToConnectRedis(error: Error): Promise<void> {
    console.error(error);
    process.exit(1);
  }
}
