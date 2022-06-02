import { PushRiotApi } from 'apps/push/src/push/dto/PushRiotApi';
import { IRiotApiJobService } from '../../interface/IRiotApiJobService';

export class RiotApiJobServiceStub implements IRiotApiJobService {
  public recentMatchIdResult(summonerId: string) {
    return [
      {
        tier: 'PLATINUM',
        summonerName: '재카로프',
        win: 32,
        lose: 17,
      },
    ];
  }
  public soloRankResult(summonerId: string) {
    return [
      {
        tier: 'PLATINUM',
        summonerName: '재카로프',
        win: 32,
        lose: 17,
      },
    ];
  }
}
