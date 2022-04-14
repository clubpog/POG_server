import { ConfigService } from './config/configService';
import { TypeOrmModule } from '@nestjs/typeorm';

export function getTypeOrmModule() {
  return TypeOrmModule.forRoot(ConfigService.ormConfig());
}
