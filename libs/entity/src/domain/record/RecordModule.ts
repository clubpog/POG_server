import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { Record } from './Record.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Record])],
  exports: [TypeOrmModule],
  providers: [],
  controllers: [],
})
export class RecordModule {}
