import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseTimeEntity } from './BaseEntity';

@Entity()
export class Users extends BaseTimeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
  })
  device_id: string;

  @Column({ default: true })
  is_push: boolean;

  @Column({
    type: 'varchar',
    // length: 50,
    nullable: false,
  })
  firebase_token: string;
}
