import { registerAs } from '@nestjs/config';

export const TestDatabaseConfig = registerAs('testDatabase', () => ({
  host: process.env.DB_TEST_HOST,
  port: process.env.DB_TEST_PORT,
  database: process.env.DB_TEST_NAME,
  username: process.env.DB_TEST_USERNAME,
  password: process.env.DB_TEST_PASSWORD,
}));
