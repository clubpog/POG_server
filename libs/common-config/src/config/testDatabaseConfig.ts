import { registerAs } from '@nestjs/config';

export const TestDatabaseConfig = registerAs('testDatabase', () => ({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_DEV_NAME,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
}));
