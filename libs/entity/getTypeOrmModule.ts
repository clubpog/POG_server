import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import * as path from 'path';
import { ConfigModule, ConfigService } from '@nestjs/config';

export const getRealTypeOrmModule = () => {
  const entityPath = path.join(__dirname, 'src/domain/**/*.entity.{js, ts}');
  const logging = process.env.LOGGING;
  const synchronize = process.env.SYNCHRONIZE;

  return TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    useFactory: (configService: ConfigService): TypeOrmModuleOptions =>
      Object.assign(configService.get<TypeOrmModuleOptions>('database'), {
        type: 'postgres',
        entities: [entityPath],
        autoLoadEntities: true,
        synchronize: synchronize === 'false' ? false : Boolean(synchronize),
        logging: logging === 'false' ? false : Boolean(logging),
        namingStrategy: new SnakeNamingStrategy(),
      }),

    inject: [ConfigService],
  });
};
