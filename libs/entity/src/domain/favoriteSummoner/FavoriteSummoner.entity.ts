import { Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { BaseTimeEntity } from '../BaseTimeEntity';
import { SummonerRecord } from '../summonerRecord/SummonerRecord.entity';
import { User } from '../user/User.entity';

@Entity()
@Index('idx_favoriteSummoner_1', ['User'])
export class FavoriteSummoner extends BaseTimeEntity {
  @ManyToOne(() => User, (user: User) => user.FavoriteSummoner, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  User: User[] | User | number;

  @ManyToOne(
    () => SummonerRecord,
    (summonerRecord: SummonerRecord) => summonerRecord.FavoriteSummoner,
    {
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
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
