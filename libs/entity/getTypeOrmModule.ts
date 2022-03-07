import { TypeOrmModule } from '@nestjs/typeorm';

import * as ormConfig from './ormConfig';

export function getTypeOrmModule() {
  return TypeOrmModule.forRoot(ormConfig);
}
