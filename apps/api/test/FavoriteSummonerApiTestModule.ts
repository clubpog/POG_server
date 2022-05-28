import { Module } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import { getWinstonLogger } from '@app/common-config/getWinstonLogger';
import { FavoriteSummonerModule } from '@app/entity/domain/favoriteSummoner/FavoriteSummonerModule';
import { SummonerRecordModule } from '@app/entity/domain/summonerRecord/SummonerRecordModule';
import { EventStoreTestModule } from '../../../libs/cache/EventStoreTestModule';
import { SummonerRecordApiModule } from '../src/summonerRecord/SummonerRecordApiModule';
import { FavoriteSummonerApiController } from '../src/favoriteSummoner/FavoriteSummonerApiController';
import { FavoriteSummonerApiService } from '../src/favoriteSummoner/FavoriteSummonerApiService';
import { FavoriteSummonerApiRepository } from '../src/favoriteSummoner/FavoriteSummonerApiRepository';
import { FavoriteSummonerApiQueryRepository } from '../src/favoriteSummoner/FavoriteSummonerApiQueryRepository';
import { ChangedTierApiModule } from '../src/changedTier/ChangedTierApiModule';

@Module({
  imports: [
    FavoriteSummonerModule,
    SummonerRecordModule,
    WinstonModule.forRoot(getWinstonLogger(process.env.NODE_ENV, 'api')),
    SummonerRecordApiModule,
    ChangedTierApiModule,
    EventStoreTestModule,
  ],
  controllers: [FavoriteSummonerApiController],
  providers: [
    FavoriteSummonerApiService,
    FavoriteSummonerApiRepository,
    FavoriteSummonerApiQueryRepository,
  ],
})
export class FavoriteSummonerTestApiModule {}
