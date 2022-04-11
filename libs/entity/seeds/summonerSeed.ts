import { SummonerRecord } from '../src/domain/summonerRecord/SummonerRecord.entity';
import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';

export class CreateSummonerRecord implements Seeder {
  async run(factory: Factory, connection: Connection): Promise<void> {
    const summonerRecord = await factory(SummonerRecord)().createMany(10000);
    await connection.getRepository(SummonerRecord).save(summonerRecord);
  }
}
