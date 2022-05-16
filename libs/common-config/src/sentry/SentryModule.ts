import { Logger, Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { RavenInterceptor } from 'nest-raven';

@Module({
  providers: [
    Logger,
    { provide: APP_INTERCEPTOR, useValue: new RavenInterceptor() },
  ],
})
export class SentryModule {}
