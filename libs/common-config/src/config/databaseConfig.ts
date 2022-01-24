import { registerAs } from '@nestjs/config';

export const DatabaseConfig = registerAs('database', () => ({
  dbHost: process.env.DB_HOST,
  dbPort: process.env.DB_PORT,
  dbName: process.env.DB_NAME,
  dbUserName: process.env.DB_USERNAME,
  dbPassword: process.env.DB_PASSWORD,
}));
