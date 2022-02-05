import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseTimeEntity } from './BaseTimeEntity';

@Entity()
export class Users extends BaseTimeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
  })
  deviceId: string;

  @Column({ default: true })
  isPush: boolean;

  @Column({
    type: 'varchar',
    // length: 50,
    nullable: false,
  })
  firebaseToken: string;
}
