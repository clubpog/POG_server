import { ConfigService } from './config/configService';
import { TypeOrmModule } from '@nestjs/typeorm';

export function getTestTypeOrmModule() {
  return TypeOrmModule.forRoot(ConfigService.testOrmConfig());
}
