import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseTimeEntity } from '../BaseTimeEntity';
import { StringValueTransformer } from '../../transformer/StringValueTransformer';
import { User } from '../user/User.entity';

@Entity()
// @Index('user_id', ['user_id'])
export class Friend extends BaseTimeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'int',
    array: true,
  })
  //   @ManyToOne(() => Users, {
  //     createForeignKeyConstraints: false,
  //   })
  //   @JoinColumn({ name: 'users_id', referencedColumnName: 'id' })
  userId: User[];

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
}
