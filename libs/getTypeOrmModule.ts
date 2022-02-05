import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import * as path from 'path';
import { ConfigModule, ConfigService } from '@nestjs/config';

export const getRealTypeOrmModule = () => {
  const entityPath = path.join(__dirname, 'entity/src/domain/repo/*.entity.js');
  return TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    useFactory: (configService: ConfigService): TypeOrmModuleOptions =>
      Object.assign(configService.get<TypeOrmModuleOptions>('database'), {
        type: 'postgres',
        entities: [entityPath],
        autoLoadEntities: true,
        synchronize: true,
        logging: true,
        namingStrategy: new SnakeNamingStrategy(),
      }),

    inject: [ConfigService],
  });
};
