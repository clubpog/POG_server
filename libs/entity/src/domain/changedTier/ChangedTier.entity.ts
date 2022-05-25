import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { BaseTimeEntity } from '../BaseTimeEntity';

@Entity()
@Index('idx_changedTier_1', ['summonerId'])
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

  @Column({
    type: 'varchar',
    nullable: false,
  })
  summonerId: string;

  static async createChangedTier(
    summonerId: string,
    matchId: string,
    tier: string,
    rank: string,
  ): Promise<ChangedTier> {
    const changedTier = new ChangedTier();
    changedTier.summonerId = summonerId;
    changedTier.matchId = matchId;
    changedTier.tier = tier;
    changedTier.rank = rank;
    return changedTier;
  }
}
