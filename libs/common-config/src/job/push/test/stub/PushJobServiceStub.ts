export class PushJobServiceStub {
  addPushQueue;

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
    this.addPushQueue = message;
    return this.addPushQueue;
  }

<<<<<<< HEAD
=======
  // AB 테스트 진행
  async defaultSummonerListSend(summonerId: string, summonerName: string) {
    const message = {
      notification: {
        title: `${summonerName} 전적 갱신`,
        body: `${summonerName}의 전적이 갱신됐어요.`,
      },
      topic: `A_${summonerId}`,
    };
    return message;
  }

>>>>>>> b99a0c32567c5b461d5efeaffab8a082d2152637
  async winSummonerListSend(summonerId: string, summonerName: string) {
    const message = {
      notification: {
        title: `${summonerName} 전적 갱신`,
        body: `${summonerName} 소환사가 승리했어요.`,
      },
      topic: `B_${summonerId}`,
    };
    return message;
  }

  async loseSummonerListSend(summonerId: string, summonerName: string) {
    const message = {
      notification: {
        title: `${summonerName} 전적 갱신`,
        body: `${summonerName} 소환사가 패배했어요.`,
      },
      topic: `B_${summonerId}`,
    };
    return message;
  }
<<<<<<< HEAD

  async tierUpSummonerListSend(summonerId: string, summonerName: string) {
    const message = {
      notification: {
        title: `${summonerName} 전적 갱신`,
        body: `${summonerName}님이 승급했습니다.`,
      },
      topic: summonerId,
    };
    return message;
  }

  async tierDownSummonerListSend(summonerId: string, summonerName: string) {
    const message = {
      notification: {
        title: `${summonerName} 전적 갱신`,
        body: `${summonerName}님이 강등했습니다.`,
      },
      topic: summonerId,
    };
    return message;
  }
=======
>>>>>>> b99a0c32567c5b461d5efeaffab8a082d2152637
}
