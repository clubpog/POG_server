import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BaseTimeEntity } from '../BaseTimeEntity';
import { StringValueTransformer } from '../../transformer/StringValueTransformer';
import { Follow } from '../follow/Follow.entity';

@Entity()
export class Record extends BaseTimeEntity {
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

  @OneToMany(() => Follow, (follow: Follow) => follow.Record, {
    eager: false,
  })
  Follow: Follow[];
}
