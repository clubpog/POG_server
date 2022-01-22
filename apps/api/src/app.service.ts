import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import DatabaseConfig from './config/databaseConfig';
import AuthConfig from './config/authConfig';

@Injectable()
export class AppService {
  constructor(
    @Inject(DatabaseConfig.KEY)
    private dbConfig: ConfigType<typeof DatabaseConfig>,
  ) {}

  getHello(): string {
    // return this.dbConfig.dbName
    return 'Hello World';
  }
}
