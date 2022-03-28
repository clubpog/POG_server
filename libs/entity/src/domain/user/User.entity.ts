import { Exclude } from 'class-transformer';
import { Column, Entity, OneToMany } from 'typeorm';
import { BaseTimeEntity } from '../BaseTimeEntity';
import { FavoriteSummoner } from '../favoriteSummoner/FavoriteSummoner.entity';

@Entity()
export class User extends BaseTimeEntity {
  @Column({
    unique: true,
    nullable: true,
  })
  userId: string;

  @Column({
    nullable: true,
  })
  password: string;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
    unique: true,
  })
  deviceId: string;

  @Column({
    default: false,
    nullable: false,
  })
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

  @Column({
    nullable: true,
    type: 'timestamptz',
  })
  loggedAt: Date | null;

  @OneToMany(
    () => FavoriteSummoner,
    (favoriteSummoner: FavoriteSummoner) => favoriteSummoner.User,
    {
      eager: false,
      onUpdate: 'CASCADE',
    },
  )
  FavoriteSummoner: FavoriteSummoner[];

  static async signup(
    // userId: string,
    // password: string,
    deviceId: string,
    firebaseToken: string,
  ): Promise<User> {
    // const salt = await genSalt();

    const user = new User();
    // user.userId = userId;
    // user.password = await hash(password, salt);
    user.deviceId = deviceId;
    user.firebaseToken = firebaseToken;
    return user;
  }

  static async signin(deviceId: string): Promise<User> {
    const user = new User();
    user.deviceId = deviceId;
    user.loggedAt = new Date();
    return user;
  }

  static async jwtUserReq(deviceId: string, userId: number): Promise<User> {
    const user = new User();
    user.deviceId = deviceId;
    user.id = userId;
    return user;
  }

  static async updateFcmToken(
    firebaseToken: string,
    deviceId: string,
  ): Promise<User> {
    const user = new User();
    user.deviceId = deviceId;
    user.firebaseToken = firebaseToken;
    return user;
  }

  static async updatePush(deviceId: string, isPush: boolean): Promise<User> {
    const user = new User();
    user.deviceId = deviceId;
    user.isPush = isPush;
    return user;
  }

  static async createId(id: number): Promise<User> {
    const user = new User();
    user.id = id;
    return user;
  }

  static async signinTest(): Promise<User> {
    const user = new User();
    return user;
  }
}
