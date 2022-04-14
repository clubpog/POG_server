import { ConfigService } from './../../../entity/config/configService';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { AuthApiService } from '../../../../apps/api/src/auth/AuthApiService';
import { JwtPayload } from './JwtPayload';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authApiService: AuthApiService) {
    super({
      secretOrKey: ConfigService.jwtSecretKey(),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: JwtPayload): Promise<JwtPayload> {
    return await this.authApiService.validateUser(payload);
  }
}
