import { TypeOrmModule } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import * as path from 'path';

export const getPgTestTypeOrmModule = () => {
  const logging = process.env.LOGGING;

  return TypeOrmModule.forRoot({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DEV_NAME,
    entities: [path.join(__dirname, '../src/domain/**/*.entity.{ts,js}')],
    synchronize: true,
    logging: logging === undefined ? true : Boolean(logging),
    namingStrategy: new SnakeNamingStrategy(),
  });
};
