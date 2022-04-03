import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { SummonerRecord } from './SummonerRecord.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SummonerRecord])],
  exports: [TypeOrmModule],
  providers: [],
  controllers: [],
})
export class SummonerRecordModule {}
