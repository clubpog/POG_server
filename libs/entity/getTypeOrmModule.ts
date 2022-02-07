import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import * as path from 'path';
import { ConfigModule, ConfigService } from '@nestjs/config';

export const getRealTypeOrmModule = () => {
  const entityPath = path.join(__dirname, 'src/domain/**/*.entity.js');
  return TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    useFactory: (configService: ConfigService): TypeOrmModuleOptions =>
      Object.assign(configService.get<TypeOrmModuleOptions>('database'), {
        type: 'postgres',
        entities: [entityPath],
        autoLoadEntities: true,
        synchronize:
          configService.get('NODE_ENV') === 'development' ? true : false,
        logging: configService.get('NODE_ENV') === 'development' ? true : false,
        namingStrategy: new SnakeNamingStrategy(),
      }),

    inject: [ConfigService],
  });
};
