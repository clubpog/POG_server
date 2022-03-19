import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { FavoriteSummoner } from './FavoriteSummoner.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FavoriteSummoner])],
  exports: [TypeOrmModule],
  providers: [],
  controllers: [],
})
export class FavoriteSummonerModule {}
