import { Exclude, Expose } from 'class-transformer';

export class UserShowDto {
  @Exclude() private readonly _id: number;
  @Exclude() private readonly _firstName: string;
  @Exclude() private readonly _lastName: string;

  constructor(user: { id: any; firstName: any; lastName: any }) {
    this._id = user.id;
    this._firstName = user.firstName;
    this._lastName = user.lastName;
  }

  @Expose()
  get id(): number {
    return this._id;
  }

  @Expose()
  get firstName(): string {
    return this._firstName;
  }

  @Expose()
  get lastName(): string {
    return this._lastName;
  }
}
