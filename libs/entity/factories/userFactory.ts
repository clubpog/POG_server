import { define } from 'typeorm-seeding';
import { faker } from '@faker-js/faker';
import { User } from '../src/domain/user/User.entity';

define(User, () => {
  const user = new User();
  user.deviceId = faker.datatype.uuid();
  user.firebaseToken = faker.datatype.uuid();
  return user;
});
