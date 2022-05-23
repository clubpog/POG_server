import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { ChangedTier } from './ChangedTier.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ChangedTier])],
  exports: [TypeOrmModule],
  providers: [],
  controllers: [],
})
export class ChangedTierModule {}
