import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { QueueOptions } from 'bull';
import * as path from 'path';

class DBConfig {
  readonly host: string;
  readonly port: number;
  readonly database: string;
  readonly username: string;
  readonly password: string;
  readonly synchronize: boolean;
  readonly logging: boolean;
}

class RedisConfig {
  readonly host: string;
  readonly port: number;
}

class SwaggerAdminConfig {
  readonly ADMIN_USER: string;
  readonly ADMIN_PASSWORD: string;
}

@Injectable()
export class ConfigService {
  static appPort(): number {
    const { PORT } = process.env;
    return PORT ? Number(PORT) : 3000;
  }

  static pushPort(): number {
    const { PUSH_PORT } = process.env;
    return PUSH_PORT ? Number(PUSH_PORT) : 4000;
  }

  static swaggerAdminAuth(): SwaggerAdminConfig {
    const { ADMIN_USER, ADMIN_PASSWORD } = process.env;
    return { ADMIN_USER, ADMIN_PASSWORD };
  }

  static jwtSecretKey(): string {
    return process.env.JWT_SECRET_KEY;
  }

  static riotApiKey(): string {
    return process.env.API_KEY;
  }

  static redisClusterConfig(): RedisConfig {
    const [host, port] =
      process.env.NODE_ENV === 'production'
        ? [process.env.REDIS_HOST, process.env.REDIS_PORT]
        : [process.env.REDIS_TEST_HOST, process.env.REDIS_TEST_PORT];

    return { host, port: Number(port) };
  }

  static redisTestConfig(): RedisConfig {
    const [host, port] = [
      process.env.REDIS_TEST_HOST,
      process.env.REDIS_TEST_PORT,
    ];

    return { host, port: Number(port) };
  }

  static bullConfig(): QueueOptions {
    const [host, port] =
      process.env.NODE_ENV === 'production'
        ? [process.env.REDIS_HOST, process.env.REDIS_PORT]
        : [process.env.REDIS_TEST_HOST, process.env.REDIS_TEST_PORT];

    return { redis: { host, port: Number(port) } };
  }

  static ormConfig(): TypeOrmModuleOptions {
    return {
      ...this.loadDBConfig(),
      type: 'postgres',
      entities: [path.join(__dirname, '..', 'src/domain/**/*.entity.{js,ts}')],
      migrations: [path.join(__dirname, '..', 'migrations/*{.ts,.js}')],
      cli: { migrationsDir: 'libs/entity/migrations' },
      migrationsTableName: 'migrations',
      autoLoadEntities: true,
      keepConnectionAlive: true,
      namingStrategy: new SnakeNamingStrategy(),
      maxQueryExecutionTime: Number(process.env.DB_CONNECTION_TIMEOUT),
      extra: {
        statement_timeout: Number(process.env.DB_CONNECTION_TIMEOUT),
      },
    };
  }

  static testOrmConfig(): TypeOrmModuleOptions {
    return {
      ...this.loadTestDBConfig(),
      type: 'postgres',
      entities: [path.join(__dirname, '..', 'src/domain/**/*.entity.{js,ts}')],
      migrations: [path.join(__dirname, '..', 'migrations/*{.ts,.js}')],
      cli: { migrationsDir: 'libs/entity/migrations' },
      migrationsTableName: 'migrations',
      autoLoadEntities: true,
      keepConnectionAlive: true,
      namingStrategy: new SnakeNamingStrategy(),
      maxQueryExecutionTime: Number(process.env.DB_CONNECTION_TIMEOUT),
      extra: {
        statement_timeout: Number(process.env.DB_CONNECTION_TIMEOUT),
      },
    };
  }

  static loadDBConfig(): DBConfig {
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
            process.env.DB_DEV_HOST,
            process.env.DB_DEV_PORT,
            process.env.DB_DEV_USERNAME,
            process.env.DB_DEV_PASSWORD,
            process.env.DB_DEV_NAME,
            process.env.DEV_LOGGING,
            process.env.DEV_SYNCHRONIZE,
          ];

    return {
      host,
      port: Number(port),
      database,
      username,
      password,
      synchronize: synchronize === 'false' ? false : Boolean(synchronize),
      logging: logging === 'false' ? false : Boolean(logging),
    };
  }

  static loadTestDBConfig(): DBConfig {
    return {
      host: process.env.DB_TEST_HOST,
      port: Number(process.env.DB_TEST_PORT),
      database: process.env.DB_TEST_NAME,
      username: process.env.DB_TEST_USERNAME,
      password: process.env.DB_TEST_PASSWORD,
      synchronize:
        process.env.TEST_SYNCHRONIZE === 'false'
          ? false
          : Boolean(process.env.TEST_SYNCHRONIZE),
      logging:
        process.env.TEST_LOGGING === 'false'
          ? false
          : Boolean(process.env.TEST_LOGGING),
    };
  }
}
