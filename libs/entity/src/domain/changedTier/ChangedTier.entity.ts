import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { BaseTimeEntity } from '../BaseTimeEntity';
import { SummonerRecord } from '../summonerRecord/SummonerRecord.entity';

@Entity()
@Index('idx_changedTier_1', ['SummonerRecord'])
export class ChangedTier extends BaseTimeEntity {
  @Column({
    type: 'varchar',
    nullable: false,
  })
  matchId: string;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  tier: string;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  rank: string;

  @ManyToOne(
    () => SummonerRecord,
    (summonerRecord: SummonerRecord) => summonerRecord.ChangedTier,
    {
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
  )
  @JoinColumn({ name: 'summoner_id', referencedColumnName: 'summonerId' })
  SummonerRecord: SummonerRecord[] | SummonerRecord | string;
}
