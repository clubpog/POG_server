import {
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseTimeEntity } from '../BaseTimeEntity';
import { SummonerRecord } from '../summonerRecord/SummonerRecord.entity';
import { User } from '../user/User.entity';

@Entity()
@Index('idx_follow_1', ['User'])
@Index('idx_follow_2', ['SummonerRecord'])
export class FavoriteSummoner extends BaseTimeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user: User) => user.FavoriteSummoner, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
    nullable: false,
    eager: false,
  })
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  User: User[] | User | number;

  @ManyToOne(
    () => SummonerRecord,
    (summonerRecord: SummonerRecord) => summonerRecord.FavoriteSummoner,
    {
      eager: true,
    },
  )
  @JoinColumn({ name: 'summoner_id', referencedColumnName: 'summonerId' })
  SummonerRecord: SummonerRecord[] | SummonerRecord | string;

  static async createFavoriteSummoner(
    userId: number,
    summonerId: string,
  ): Promise<FavoriteSummoner> {
    const favoriteSummoner = new FavoriteSummoner();
    favoriteSummoner.User = userId;
    favoriteSummoner.SummonerRecord = summonerId;
    return favoriteSummoner;
  }
}
