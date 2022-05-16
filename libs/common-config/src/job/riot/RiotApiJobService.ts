import { IRiotApiJobService } from './interface/IRiotApiJobService';
import { ConfigService } from '../../../../entity/config/configService';
import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { plainToInstance } from 'class-transformer';
import { PushRiotApi } from '../../../../../apps/push/src/push/dto/PushRiotApi';

@Injectable()
export class RiotApiJobService implements IRiotApiJobService {
  public async soloRankResult(summonerId: string) {
    const riotApiResponse = await this.riotLeagueApi(summonerId);
    // const riotApiResponse = false;

    return riotApiResponse === false
      ? false
      : plainToInstance(PushRiotApi, riotApiResponse);
  }

  private async riotLeagueApi(summonerId: string): Promise<any> {
    const url = `https://kr.api.riotgames.com/lol/league/v4/entries/by-summoner/${summonerId}?api_key=${ConfigService.riotApiKey()}`;
    try {
      const res = await axios.get(url);
      const soloRankResult = res.data.filter(
        riotApiReturn => riotApiReturn['queueType'] === 'RANKED_SOLO_5x5',
      );
      return soloRankResult.length === 0 ? false : soloRankResult;
    } catch (error) {
      console.error(error);
    }
  }
}
