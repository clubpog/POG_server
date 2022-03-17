import {
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseTimeEntity } from '../BaseTimeEntity';
import { Record } from '../record/Record.entity';
import { User } from '../user/User.entity';

@Entity()
@Index('idx_follow_1', ['User'])
@Index('idx_follow_2', ['Record'])
export class Follow extends BaseTimeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user: User) => user.Follow, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
    nullable: false,
    eager: false,
  })
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  User: User[];

  @ManyToOne(() => Record, (record: Record) => record.Follow, {
    nullable: false,
    eager: true,
  })
  @JoinColumn({ name: 'summoner_id', referencedColumnName: 'summonerId' })
  Record: Record[];
}
