import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { User } from '../src/domain/user/User.entity';

export class CreateUser implements Seeder {
  async run(factory: Factory, connection: Connection): Promise<void> {
    const user = await factory(User)().createMany(900000);
    await connection.getRepository(User).save(user);
  }
}
