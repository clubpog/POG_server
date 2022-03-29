import { SummonerRecordId } from '@app/entity/domain/summonerRecord/SummonerRecordId';
import { FavoriteSummonerApiQueryRepository } from './FavoriteSummonerApiQueryRepository';
import { FavoriteSummonerReq } from './dto/FavoriteSummonerReq.dto';
import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { FavoriteSummoner } from '@app/entity/domain/favoriteSummoner/FavoriteSummoner.entity';
import { SummonerRecordApiQueryRepository } from '../summonerRecord/SummonerRecordApiQueryRepository';
import { SummonerRecord } from '@app/entity/domain/summonerRecord/SummonerRecord.entity';
import { UserReq } from '../user/dto/UserReq.dto';
import { FavoriteSummonerIdReq } from './dto/FavoriteSummonerIdReq.dto';
import { FavoriteSummonerId } from '@app/entity/domain/favoriteSummoner/FavoriteSummonerId';
import { User } from '@app/entity/domain/user/User.entity';
import { FavoriteSummonerRes } from './dto/FavoriteSummonerRes.dto';

@Injectable()
export class FavoriteSummonerApiService {
  private readonly favoriteSummonerLimitCount: number = 5;
  private readonly nonUsedSummonerIdCount: number = 0;

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
    favoriteSummonerDto: FavoriteSummonerReq,
  ): Promise<void> {
    await this.checkLimitFavoriteSummoner(userDto.userId);
    await this.saveSummonerRecord(favoriteSummonerDto);

    const findFavoriteSummonerId =
      await this.findFavoriteSummonerIdWithSoftDelete(
        userDto.userId,
        favoriteSummonerDto.summonerId,
      );

    if (!findFavoriteSummonerId) {
      await this.favoriteSummonerRepository.save(
        await favoriteSummonerDto.toFavoriteSummonerEntity(userDto.userId),
      );
    } else {
      await this.favoriteSummonerRepository.restore(findFavoriteSummonerId.id);
    }
  }

  async deleteFavoriteSummoner(
    userDto: UserReq,
    favoriteSummonerIdDto: FavoriteSummonerIdReq,
  ): Promise<void> {
    const favoriteSummonerId = await this.findFavoriteSummonerId(
      userDto.userId,
      favoriteSummonerIdDto.summonerId,
    );

    if (!favoriteSummonerId) {
      throw new NotFoundException('삭제할 즐겨찾기를 조회할 수 없습니다.');
    }
    await this.favoriteSummonerRepository.softDelete(favoriteSummonerId.id);
    if (!(await this.isUsedSummonerRecordId(favoriteSummonerIdDto.summonerId)))
      await this.deleteSummonerRecord(favoriteSummonerIdDto.summonerId);
  }

  async getFavoriteSummoner(userDto: User): Promise<FavoriteSummonerRes[]> {
    return await this.findAllFavoriteSummoners(userDto.id);
  }

  private async checkLimitFavoriteSummoner(userId: number) {
    if (await this.isLimitCountFavoriteSummonerId(userId)) {
      throw new ForbiddenException('즐겨찾기 한도가 초과되었습니다.');
    }
  }

  private async deleteSummonerRecord(summonerId: string): Promise<void> {
    await this.summonerRecordRepository.delete(
      await this.findSummonerRecordBySummonerId(summonerId),
    );
  }

  private async saveSummonerRecord(favoriteSummonerDto: FavoriteSummonerReq) {
    const isFindSummonerRecordId = await this.isSummonerRecordBySummonerId(
      favoriteSummonerDto.summonerId,
    );

    if (!isFindSummonerRecordId) {
      await this.summonerRecordRepository.save(
        await favoriteSummonerDto.toSummonerRecordEntity(),
      );
    }
  }

  private async isSummonerRecordBySummonerId(
    summonerId: string,
  ): Promise<boolean> {
    const dto =
      await this.summonerRecordApiQueryRepository.findSummonerRecordWithSoftDelete(
        summonerId,
      );
    return dto !== undefined ? true : false;
  }

  private async findSummonerRecordBySummonerId(
    summonerId: string,
  ): Promise<SummonerRecordId> {
    return await this.summonerRecordApiQueryRepository.findSummonerRecordIdBySummonerId(
      summonerId,
    );
  }

  private async isLimitCountFavoriteSummonerId(
    userId: number,
  ): Promise<boolean> {
    const count = await this.favoriteSummonerApiQueryRepository.countId(userId);
    return count >= this.favoriteSummonerLimitCount ? true : false;
  }

  private async isUsedSummonerRecordId(summonerId: string): Promise<boolean> {
    const count = await this.favoriteSummonerApiQueryRepository.countSummonerId(
      summonerId,
    );
    return count !== this.nonUsedSummonerIdCount ? true : false;
  }

  private async findFavoriteSummonerIdWithSoftDelete(
    userId: number,
    summonerId: string,
  ): Promise<FavoriteSummonerId> {
    return await this.favoriteSummonerApiQueryRepository.findFavoriteSummonerWithSoftDelete(
      userId,
      summonerId,
    );
  }

  private async findFavoriteSummonerId(
    userId: number,
    summonerId: string,
  ): Promise<FavoriteSummonerId> {
    return await this.favoriteSummonerApiQueryRepository.findFavoriteSummonerId(
      userId,
      summonerId,
    );
  }

  private async findAllFavoriteSummoners(
    userId: number,
  ): Promise<FavoriteSummonerRes[]> {
    const favoriteSummonerJoinSummonerRecords =
      await this.favoriteSummonerApiQueryRepository.findAllFavoriteSummoners(
        userId,
      );
    return favoriteSummonerJoinSummonerRecords.map(
      favoriteSummonerJoinSummonerRecord =>
        new FavoriteSummonerRes(favoriteSummonerJoinSummonerRecord),
    );
  }
}
