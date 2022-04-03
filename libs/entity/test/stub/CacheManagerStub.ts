export class CacheStub {
  async get(): Promise<boolean> {
    return null;
  }

  async set(): Promise<string> {
    return 'OK';
  }

  async del(key: string): Promise<any> {
    return;
  }
}
