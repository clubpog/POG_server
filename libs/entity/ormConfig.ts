import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import * as path from 'path';
import * as dotenv from 'dotenv';

dotenv.config();

const [logging, synchronize] =
  process.env.NODE_ENV === 'production'
    ? [process.env.LOGGING, process.env.SYNCHRONIZE]
    : [process.env.TEST_LOGGING, process.env.TEST_SYNCHRONIZE];

const OrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_TEST_HOST,
  port: Number(process.env.DB_TEST_PORT),
  username: process.env.DB_TEST_USERNAME,
  password: process.env.DB_TEST_PASSWORD,
  database: process.env.DB_TEST_NAME,
  entities: [path.join(__dirname, 'src/domain/**/*.entity.{js, ts}')],
  migrations: [__dirname + '/src/domain/**/*.ts'],
  cli: { migrationsDir: 'libs/entity/migrations' },
  migrationsTableName: 'migrations',
  autoLoadEntities: true,
  synchronize: synchronize === 'false' ? false : Boolean(synchronize),
  logging: logging === 'false' ? false : Boolean(logging),
  keepConnectionAlive: true,
  namingStrategy: new SnakeNamingStrategy(),
};

export = OrmConfig;
