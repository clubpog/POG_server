import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { Favorite } from './Favorite.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Favorite])],
  exports: [TypeOrmModule],
  providers: [],
  controllers: [],
})
export class FavoriteModule {}
