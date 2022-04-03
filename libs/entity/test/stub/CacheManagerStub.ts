export class CacheStub {
  async get(): Promise<boolean> {
    return null;
  }

  async set(): Promise<string> {
    return 'OK';
  }
}
