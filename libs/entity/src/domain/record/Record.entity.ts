import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseTimeEntity } from '../BaseTimeEntity';
import { StringValueTransformer } from '../../transformer/StringValueTransformer';
import { User } from '../user/User.entity';

@Entity()
@Index('idx_record_1', ['User'])
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
  })
  lolId: string;

  @Column({
    type: 'int',
  })
  leaguePoint: number;

  @Column({
    type: 'varchar',
  })
  rank: string;

  @ManyToOne(() => User, (user: User) => user.Record, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
    nullable: false,
    eager: false,
    // createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  User: User[];
}
