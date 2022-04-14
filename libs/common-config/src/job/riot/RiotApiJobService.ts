import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class RiotApiJobService {
  static async riotLeagueApi(summonerId: string) {
    const url = `https://kr.api.riotgames.com/lol/league/v4/entries/by-summoner/${summonerId}?api_key=${process.env.API_KEY}`;

    const res = await axios.get(url);

    return res.data.filter(
      riotApiReturn => riotApiReturn['queueType'] === 'RANKED_SOLO_5x5',
    );
  }
}
