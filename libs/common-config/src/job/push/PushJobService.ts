import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { ServiceAccount } from 'firebase-admin';

@Injectable()
export class PushJobService {
  constructor() {
    if (!admin.apps.length) {
      admin.initializeApp({
        credential: admin.credential.cert(
          JSON.parse(process.env.POG_SDK) as ServiceAccount,
        ),
      });
    }
  }
  // Title
  // {소환사 이름} 전적 갱신

  // SubTitle
  // {소환사 이름}의 전적이 갱신됐어요
  async send(summonerId: string, summonerName: string) {
    const message = {
      notification: {
        title: `${summonerName} 전적 갱신`,
        body: `${summonerName}의 전적이 갱신됐어요.`,
      },
      topic: summonerId,
    };
    return Promise.all([await admin.messaging().send(message)]);
  }

  // AB 테스트 진행
  async winSummonerListSend(summonerId: string, summonerName: string) {
    const message = {
      notification: {
        title: `${summonerName} 전적 갱신`,
        body: `${summonerName}가 승리했어요.`,
      },
      topic: summonerId,
    };
    return Promise.all([await admin.messaging().send(message)]);
  }

  async loseSummonerListSend(summonerId: string, summonerName: string) {
    const message = {
      notification: {
        title: `${summonerName} 전적 갱신`,
        body: `${summonerName}가 패배했어요.`,
      },
      topic: summonerId,
    };
    return Promise.all([await admin.messaging().send(message)]);
  }

  async tierUpSummonerListSend(summonerId: string, summonerName: string) {
    const message = {
      notification: {
        title: `${summonerName} 전적 갱신`,
        body: `${summonerName}님이 승급했습니다.`,
      },
      topic: summonerId,
    };
    return Promise.all([await admin.messaging().send(message)]);
  }

  async tierDownSummonerListSend(summonerId: string, summonerName: string) {
    const message = {
      notification: {
        title: `${summonerName} 전적 갱신`,
        body: `${summonerName}님이 강등했습니다.`,
      },
      topic: summonerId,
    };
    return Promise.all([await admin.messaging().send(message)]);
  }
}
