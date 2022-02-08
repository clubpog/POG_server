import { Exclude } from 'class-transformer';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseTimeEntity } from '../BaseTimeEntity';
import { genSalt, hash } from 'bcrypt';

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
    nullable: false,
  })
  firebaseToken: string;

  @Column({
    nullable: true,
  })
  @Exclude()
  currentHashedRefreshToken?: string;

  static async signup(
    userId: string,
    password: string,
    deviceId: string,
    firebaseToken: string,
  ): Promise<User> {
    const salt = await genSalt();

    const user = new User();
    user.userId = userId;
    user.password = await hash(password, salt);
    user.deviceId = deviceId;
    user.firebaseToken = firebaseToken;
    user.isPush = true;
    return user;
  }
}
