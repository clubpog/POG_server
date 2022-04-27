import { EventStoreModule } from './../../../../libs/cache/EventStoreModule';
import { Module, Provider } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import { getWinstonLogger } from '@app/common-config/getWinstonLogger';
import { FavoriteSummonerApiService } from './FavoriteSummonerApiService';
import { FavoriteSummonerApiController } from './FavoriteSummonerApiController';
import { FavoriteSummonerApiRepository } from './FavoriteSummonerApiRepository';
import { FavoriteSummonerModule } from '@app/entity/domain/favoriteSummoner/FavoriteSummonerModule';
import { SummonerRecordApiModule } from '../summonerRecord/SummonerRecordApiModule';
import { SummonerRecordModule } from '@app/entity/domain/summonerRecord/SummonerRecordModule';
import { FavoriteSummonerApiQueryRepository } from './FavoriteSummonerApiQueryRepository';

@Module({
  imports: [
    FavoriteSummonerModule,
    SummonerRecordModule,
    WinstonModule.forRoot(getWinstonLogger(process.env.NODE_ENV, 'api')),
    SummonerRecordApiModule,
    EventStoreModule,
  ],
  controllers: [FavoriteSummonerApiController],
  providers: [
    FavoriteSummonerApiService,
    FavoriteSummonerApiRepository,
    FavoriteSummonerApiQueryRepository,
  ],
})
export class FavoriteSummonerApiModule {}
