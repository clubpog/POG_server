import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseTimeEntity } from '../BaseTimeEntity';

@Entity()
export class User extends BaseTimeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
  })
  userId: string;

  @Column()
  password: string;

  @Column()
  ip: string;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
    unique: true,
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
