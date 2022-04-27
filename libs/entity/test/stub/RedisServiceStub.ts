import { IEventStoreService } from './../../../cache/interface/integration';
import { FavoriteSummonerReq } from './../../../../apps/api/src/favoriteSummoner/dto/FavoriteSummonerReq.dto';

export class RedisServiceStub implements IEventStoreService {
  async set(): Promise<void> {}
  async save(): Promise<void> {}
  async sadd(): Promise<void> {}
  async get(): Promise<string> {
    return 'OK';
  }

  // async del(array): Promise<any> {
  //   return;
  // }

  // async mget(...args): Promise<null[]> {
  //   return [null, null, null];
  // }

  // async multi() {
  //   return;
  // }

  // async exec(): Promise<boolean> {
  //   return null;
  // }

  // async srem(): Promise<void> {}

  async saveRedisSummonerRecord(
    favoriteSummonerDto: FavoriteSummonerReq,
  ): Promise<void> {}

  async removeTransactionRedis(summonerId: string): Promise<void> {}
}
