import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import * as path from 'path';
import * as dotenv from 'dotenv';

dotenv.config();

const [host, port, username, password, database, logging, synchronize] =
  process.env.NODE_ENV === 'production'
    ? [
        process.env.DB_HOST,
        process.env.DB_PORT,
        process.env.DB_USERNAME,
        process.env.DB_PASSWORD,
        process.env.DB_NAME,
        process.env.LOGGING,
        process.env.SYNCHRONIZE,
      ]
    : [
        process.env.DB_TEST_HOST,
        process.env.DB_TEST_PORT,
        process.env.DB_TEST_USERNAME,
        process.env.DB_TEST_PASSWORD,
        process.env.DB_TEST_NAME,
        process.env.TEST_LOGGING,
        process.env.TEST_SYNCHRONIZE,
      ];

const OrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host,
  port: Number(port),
  username,
  password,
  database,
  entities: [path.join(__dirname, '..', 'src/domain/**/*.entity.{js,ts}')],
  migrations: [path.join(__dirname, '..', 'migrations/*{.ts,.js}')],
  cli: { migrationsDir: 'libs/entity/migrations' },
  migrationsTableName: 'migrations',
  autoLoadEntities: true,
  synchronize: Boolean(synchronize),
  logging: Boolean(logging),
  keepConnectionAlive: true,
  namingStrategy: new SnakeNamingStrategy(),
  maxQueryExecutionTime: Number(process.env.DB_CONNECTION_TIMEOUT),
  extra: {
    statement_timeout: Number(process.env.DB_CONNECTION_TIMEOUT),
  },
};

export = OrmConfig;
