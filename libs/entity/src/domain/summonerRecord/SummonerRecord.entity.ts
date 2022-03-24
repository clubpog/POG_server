import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseTimeEntity } from '../BaseTimeEntity';
import { FavoriteSummoner } from '../favoriteSummoner/FavoriteSummoner.entity';

@Entity()
@Index('idx_summonerRecord_1', ['summonerId'])
export class SummonerRecord extends BaseTimeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
  })
  name: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  tier: string;

  @Column({
    type: 'int',
  })
  win: number;

  @Column({
    type: 'int',
  })
  lose: number;

  @Column({
    type: 'int',
  })
  profileIconId: number;

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
    nullable: true,
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
    profileIconId: number,
    puuid: string,
    summonerId: string,
    leaguePoint: number,
    rank: string,
  ): Promise<SummonerRecord> {
    const summonerRecord = new SummonerRecord();
    summonerRecord.name = name;
    summonerRecord.tier = tier ? tier : null;
    summonerRecord.win = win;
    summonerRecord.lose = lose;
    summonerRecord.profileIconId = profileIconId ? profileIconId : null;
    summonerRecord.puuid = puuid;
    summonerRecord.summonerId = summonerId;
    summonerRecord.leaguePoint = leaguePoint;
    summonerRecord.rank = rank ? rank : null;
    return summonerRecord;
  }
}
