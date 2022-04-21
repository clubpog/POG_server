import { RedisStub } from './RedisStub';

export class RedisServiceStub {
  private readonly master;

  constructor() {
    this.master = new RedisStub();
  }
}
