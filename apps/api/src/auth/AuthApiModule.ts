import { Module } from '@nestjs/common';
import { AuthService } from './AuthApiService';

@Module({
  providers: [AuthService],
})
export class AuthModule {}
