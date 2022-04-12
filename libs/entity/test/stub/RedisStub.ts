export class RedisStub {
  async mget(...args): Promise<null[]> {
    return [null, null, null];
  }

  async set(): Promise<string> {
    return 'OK';
  }

  async del(array): Promise<any> {
    return;
  }

  async multi() {
    return;
  }

  async exec(): Promise<boolean> {
    return null;
  }

  async srem(): Promise<void> {}
  async sadd(): Promise<void> {}
}
