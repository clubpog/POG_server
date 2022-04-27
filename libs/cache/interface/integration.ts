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

  saveRedisSummonerRecord(
    favoriteSummonerDto: FavoriteSummonerReq,
  ): Promise<void>;

  removeTransactionRedis(summonerId: string): Promise<void>;
}
