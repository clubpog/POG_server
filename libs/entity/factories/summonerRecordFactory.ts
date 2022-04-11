import { SummonerRecord } from '../src/domain/summonerRecord/SummonerRecord.entity';
import { define } from 'typeorm-seeding';
import { faker } from '@faker-js/faker';

define(SummonerRecord, () => {
  const summonerRecord = new SummonerRecord();
  summonerRecord.name = faker.datatype.string();
  summonerRecord.tier = faker.datatype.string();
  summonerRecord.win = faker.datatype.number();
  summonerRecord.lose = faker.datatype.number();
  summonerRecord.profileIconId = faker.datatype.number();
  summonerRecord.puuid = faker.datatype.uuid();
  summonerRecord.summonerId = faker.datatype.uuid();
  summonerRecord.leaguePoint = faker.datatype.number();
  summonerRecord.rank = faker.datatype.string();
  return summonerRecord;
});
