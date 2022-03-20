import { Module } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import { getWinstonLogger } from '@app/common-config/getWinstonLogger';
import { SummonerRecordModule } from '@app/entity/domain/summonerRecord/SummonerRecordModule';
import { SummonerRecordApiQueryRepository } from './SummonerRecordApiQueryRepository';

@Module({
  imports: [
    SummonerRecordModule,
    WinstonModule.forRoot(getWinstonLogger(process.env.NODE_ENV, 'api')),
  ],
  providers: [SummonerRecordApiQueryRepository],
  exports: [SummonerRecordApiQueryRepository],
})
export class SummonerRecordApiModule {}
