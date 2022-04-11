import { RedisStub } from './RedisStub';

export class RedisServiceStub {
  getClient() {
    return new RedisStub();
  }
}
