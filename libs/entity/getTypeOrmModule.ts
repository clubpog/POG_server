import { TypeOrmModule } from '@nestjs/typeorm';
import * as ormConfig from './config/ormConfig';

export function getTypeOrmModule() {
  return TypeOrmModule.forRoot(ormConfig);
}
