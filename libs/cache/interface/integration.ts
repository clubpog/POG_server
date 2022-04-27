import { PushRiotApi } from '../../../apps/push/src/push/dto/PushRiotApi';
import { FavoriteSummonerReq } from '../../../apps/api/src/favoriteSummoner/dto/FavoriteSummonerReq.dto';

export class Event {
  readonly subject: string;
  readonly data: any;
}

export interface IEventStoreService {
  save(event: Event): Promise<void>;

  set(key: string, value: string): Promise<void>;
  sadd(key: string, value: string): Promise<void>;

  get(key: string): Promise<string | null>;
  smembers(key: string): Promise<string[]>;

  saveRedisSummonerRecord(
    favoriteSummonerDto: FavoriteSummonerReq,
  ): Promise<void>;

  removeTransactionRedis(summonerId: string): Promise<void>;

  redisKeyErrorCheck(summonerId: string): Promise<boolean>;
  pushChangeRecord(
    riotApiResponse: PushRiotApi,
    summonerId: string,
  ): Promise<void>;
  summonerRecordMget(summonerId: string): Promise<string[]>;
  unRankMset(summonerId: string): Promise<void>;
}
