import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from './configService';

const migrateConfig: TypeOrmModuleOptions = ConfigService.ormConfig();

export = migrateConfig;
