import { Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { BaseTimeEntity } from '../BaseTimeEntity';
import { SummonerRecord } from '../summonerRecord/SummonerRecord.entity';
import { User } from '../user/User.entity';

@Entity()
@Index('idx_favoriteSummoner_1', ['User'])
@Index('idx_favoriteSummoner_2', ['SummonerRecord'])
export class FavoriteSummoner extends BaseTimeEntity {
  @ManyToOne(() => User, (user: User) => user.FavoriteSummoner, {
    nullable: false,
  })
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  User: User[] | User | number;

  @ManyToOne(
    () => SummonerRecord,
    (summonerRecord: SummonerRecord) => summonerRecord.FavoriteSummoner,
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
