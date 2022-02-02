import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseTimeEntity } from './BaseEntity';
import { StringValueTransformer } from './transformer/StringValueTransformer';
import { Users } from './Users.entity';

@Entity()
// @Index('user_id', ['user_id'])
export class Friends extends BaseTimeEntity {
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
  user_id: Users[];

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
  profile_icon_id: string;

  @Column({
    type: 'varchar',
  })
  puuid: string;

  @Column({
    type: 'varchar',
  })
  lol_id: string;

  @Column({
    type: 'int',
  })
  league_point: number;

  @Column({
    type: 'varchar',
  })
  rank: string;
}
