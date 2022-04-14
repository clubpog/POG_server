import { Module } from '@nestjs/common';
import { RiotApiJobService } from './RiotApiJobService';

@Module({
  providers: [RiotApiJobService],
  exports: [RiotApiJobService],
})
export class RiotApiJobModule {}
