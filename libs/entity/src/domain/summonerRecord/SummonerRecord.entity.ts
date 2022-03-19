import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BaseTimeEntity } from '../BaseTimeEntity';
import { StringValueTransformer } from '../../transformer/StringValueTransformer';
import { FavoriteSummoner } from '../favoriteSummoner/FavoriteSummoner.entity';

@Entity()
export class SummonerRecord extends BaseTimeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
  })
  name: string;

  @Column({
    type: 'varchar',
  })
  tier: string;

  @Column({
    type: 'bigint',
  })
  win: number;

  @Column({
    type: 'bigint',
  })
  lose: number;

  @Column({
    type: 'varchar',
    transformer: new StringValueTransformer(),
  })
  profileIconId: string;

  @Column({
    type: 'varchar',
  })
  puuid: string;

  @Column({
    type: 'varchar',
    unique: true,
  })
  summonerId: string;

  @Column({
    type: 'int',
  })
  leaguePoint: number;

  @Column({
    type: 'varchar',
  })
  rank: string;

  @OneToMany(
    () => FavoriteSummoner,
    (favoriteSummoner: FavoriteSummoner) => favoriteSummoner.SummonerRecord,
    {
      eager: false,
    },
  )
  FavoriteSummoner: FavoriteSummoner[];

  static async createSummonerRecord(
    name: string,
    tier: string,
    win: number,
    lose: number,
    profileIconId: string,
    puuid: string,
    summonerId: string,
    leaguePoint: number,
    rank: string,
  ): Promise<SummonerRecord> {
    const summonerRecord = new SummonerRecord();
    summonerRecord.name = name;
    summonerRecord.tier = tier;
    summonerRecord.win = win;
    summonerRecord.lose = lose;
    summonerRecord.profileIconId = profileIconId;
    summonerRecord.puuid = puuid;
    summonerRecord.summonerId = summonerId;
    summonerRecord.leaguePoint = leaguePoint;
    summonerRecord.rank = rank;
    return summonerRecord;
  }
}
