import { FavoriteSummonerApiQueryRepository } from './FavoriteSummonerApiQueryRepository';
import { FavoriteSummonerIdReq } from './dto/FavoriteSummonerIdReq.dto';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { FavoriteSummoner } from '@app/entity/domain/favoriteSummoner/FavoriteSummoner.entity';
import { SummonerRecordApiQueryRepository } from '../summonerRecord/SummonerRecordApiQueryRepository';
import { SummonerRecord } from '@app/entity/domain/summonerRecord/SummonerRecord.entity';
import { UserReq } from '../user/dto/UserReq.dto';

@Injectable()
export class FavoriteSummonerApiService {
  private readonly favoriteSummonerLimitCount: number = 3;

  constructor(
    @InjectRepository(FavoriteSummoner)
    private favoriteSummonerRepository?: Repository<FavoriteSummoner>,
    @InjectRepository(SummonerRecord)
    private summonerRecordRepository?: Repository<SummonerRecord>,
    private readonly summonerRecordApiQueryRepository?: SummonerRecordApiQueryRepository,
    private readonly favoriteSummonerApiQueryRepository?: FavoriteSummonerApiQueryRepository,
  ) {}

  async createFavoriteSummoner(
    userDto: UserReq,
    favoriteSummonerDto: FavoriteSummonerIdReq,
  ): Promise<void> {
    if (await this.isLimitCountFavoriteSummonerId(userDto.userId)) {
      throw new ForbiddenException('즐겨찾기 한도가 초과되었습니다.');
    }

    const isFindSummonerRecordId = await this.isSummonerRecordBySummonerId(
      favoriteSummonerDto.summonerId,
    );

    if (!isFindSummonerRecordId) {
      await this.summonerRecordRepository.save(
        await favoriteSummonerDto.toSummonerRecordEntity(),
      );
    }

    const isFindFavoriteSummoner = await this.isFavoriteSummoner(
      userDto.userId,
      favoriteSummonerDto.summonerId,
    );

    // favorite_summoner 테이블에서, user_id, summoner_id가 있더라도, deleted_at이 데이터가 있으면, 다시 추가 가능. or deleted_at를 다시 null로 설정.
    if (!isFindFavoriteSummoner) {
      await this.favoriteSummonerRepository.save(
        await favoriteSummonerDto.toFavoriteSummonerEntity(userDto.userId),
      );
    }
  }

  async isSummonerRecordBySummonerId(summonerId: string): Promise<boolean> {
    return await this.summonerRecordApiQueryRepository.isSummonerRecordIdBySummonerId(
      summonerId,
    );
  }

  async isFavoriteSummoner(
    userId: number,
    summonerId: string,
  ): Promise<boolean> {
    return await this.favoriteSummonerApiQueryRepository.isFavoriteSummoner(
      userId,
      summonerId,
    );
  }

  async isLimitCountFavoriteSummonerId(userId: number): Promise<boolean> {
    const count = await this.favoriteSummonerApiQueryRepository.countId(userId);
    return count >= this.favoriteSummonerLimitCount ? true : false;
  }
}
