import * as dotenv from 'dotenv';
import * as path from 'path';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

dotenv.config();

const seedConfig = {
  type: 'postgres',
  database: process.env.DB_TEST_NAME,
  entities: [path.join(__dirname, 'src/domain/**/*.entity.{js,ts}')],
  seeds: [path.join(__dirname, 'seeds/*.{js,ts}')],
  factories: [path.join(__dirname, 'factories/*.{js,ts}')],
  namingStrategy: new SnakeNamingStrategy(),
};
export default seedConfig;
