import { registerAs } from '@nestjs/config';

export const AuthConfig = registerAs('auth', () => ({
  jwtSecret: process.env.JWT_SECRET_KEY,
}));
