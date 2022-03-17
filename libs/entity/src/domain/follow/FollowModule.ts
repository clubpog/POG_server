import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { Follow } from './Follow.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Follow])],
  exports: [TypeOrmModule],
  providers: [],
  controllers: [],
})
export class FollowModule {}
