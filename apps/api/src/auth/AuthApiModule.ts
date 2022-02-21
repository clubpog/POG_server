import { JwtStrategy } from '@app/common-config/jwt/JwtStrategy';
import { UserModule } from '@app/entity/domain/user/UserModule';
import { Module } from '@nestjs/common';
import { AuthApiService } from './AuthApiService';
import { AuthApiController } from './AuthApiController';
import { UserApiModule } from '../user/UserApiModule';
import { WinstonModule } from 'nest-winston';
import { getWinstonLogger } from '@app/common-config/getWinstonLogger';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    UserModule,
    UserApiModule,
    WinstonModule.forRoot(getWinstonLogger(process.env.NODE_ENV, 'api')),
    PassportModule.register({ defaultStrategy: 'jwt', session: false }),
    JwtModule.registerAsync({
      useFactory: async () => ({
        secret: process.env.JWT_SECRET_KEY,
        signOptions: { expiresIn: '1y' },
      }),
    }),
  ],
  controllers: [AuthApiController],
  providers: [AuthApiService, JwtStrategy],
  exports: [AuthApiService],
})
export class AuthApiModule {}
