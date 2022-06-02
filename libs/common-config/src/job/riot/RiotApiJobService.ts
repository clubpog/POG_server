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
    return riotApiResponse === false
      ? false
      : plainToInstance(PushRiotApi, riotApiResponse);
  }

  public async recentMatchIdResult(puuid: string): Promise<string> {
    try {
      const riotApiResponse = await this.riotMatchIdApi(puuid);
      return riotApiResponse[0];
    } catch (error) {
      throw error;
    }
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

  private async riotMatchIdApi(puuid: string): Promise<any> {
    const url = `https://asia.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?type=ranked&start=0&count=10&api_key=${ConfigService.riotApiKey()}`;

    try {
      const res = await axios.get(url);
      const recentRiotMatchIdResult = res.data;
      return recentRiotMatchIdResult;
    } catch (error) {
      console.error(error);
    }
  }
}
