import { ChangedTierApiQueryRepository } from './ChangedTierApiQueryRepository';
import { Module } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import { getWinstonLogger } from '@app/common-config/getWinstonLogger';
import { ChangedTierModule } from '@app/entity/domain/changedTier/ChangedTierModule';

@Module({
  imports: [
    ChangedTierModule,
    WinstonModule.forRoot(getWinstonLogger(process.env.NODE_ENV, 'api')),
  ],
  providers: [ChangedTierApiQueryRepository],
  exports: [ChangedTierApiQueryRepository],
})
export class ChangedTierApiModule {}
