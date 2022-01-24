import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { DatabaseConfig, AuthConfig } from '@app/common-config/config';

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
