import { IEventStoreService } from './../../../cache/interface/integration';
import { FavoriteSummonerReq } from './../../../../apps/api/src/favoriteSummoner/dto/FavoriteSummonerReq.dto';
import { PushRiotApi } from 'apps/push/src/push/dto/PushRiotApi';

export class RedisServiceStub implements IEventStoreService {
  async set(): Promise<void> {}
  async save(): Promise<void> {}
  async sadd(): Promise<void> {}
  async get(): Promise<string> {
    return 'OK';
  }
  async smembers(key: string): Promise<string[]> {
    return ['test'];
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
  async redisKeyErrorCheck(summonerId: string): Promise<boolean> {
    return false;
  }
  async pushChangeRecord(
    riotApiResponse: PushRiotApi,
    summonerId: string,
  ): Promise<void> {
    return;
  }

  async unRankMset(summonerId: string): Promise<void> {}

  async summonerRecordMget(summonerId: string): Promise<string[]> {
    return ['33', '17', 'PLATINUM'];
  }
}
