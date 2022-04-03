import { SummonerRecordId } from '@app/entity/domain/summonerRecord/SummonerRecordId';
import { FavoriteSummonerApiQueryRepository } from './FavoriteSummonerApiQueryRepository';
import { FavoriteSummonerReq } from './dto/FavoriteSummonerReq.dto';
import {
  CACHE_MANAGER,
  ForbiddenException,
  Inject,
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
import { Cache } from 'cache-manager';

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
    @Inject(CACHE_MANAGER) private cacheManager?: Cache,
  ) {}

  async createFavoriteSummoner(
    userDto: UserReq,
    favoriteSummonerDto: FavoriteSummonerReq,
  ): Promise<void> {
    await this.checkLimitFavoriteSummoner(userDto.userId);
    await this.saveCacheSummonerRecord(favoriteSummonerDto);
    await this.saveSummonerRecord(favoriteSummonerDto);
    await this.saveFavoriteSummoner(favoriteSummonerDto, userDto);
    await this.restoreFavoriteSummoner(favoriteSummonerDto, userDto);
  }

  async deleteFavoriteSummoner(
    userDto: UserReq,
    favoriteSummonerIdDto: FavoriteSummonerIdReq,
  ): Promise<void> {
    await this.checkNotFoundFavoriteSummoner(userDto, favoriteSummonerIdDto);
    await this.softDeleteFavoriteSummoner(userDto, favoriteSummonerIdDto);
    await this.deleteNoUseSummonerRecord(favoriteSummonerIdDto);
  }

  async getFavoriteSummoner(userDto: User): Promise<FavoriteSummonerRes[]> {
    return await this.findAllFavoriteSummoners(userDto.id);
  }

  private async checkNotFoundFavoriteSummoner(
    userDto: UserReq,
    favoriteSummonerIdDto: FavoriteSummonerIdReq,
  ) {
    const favoriteSummonerId = await this.findFavoriteSummonerId(
      userDto.userId,
      favoriteSummonerIdDto.summonerId,
    );

    if (!favoriteSummonerId) {
      throw new NotFoundException('삭제할 즐겨찾기를 조회할 수 없습니다.');
    }
  }

  private async deleteNoUseSummonerRecord(
    favoriteSummonerIdDto: FavoriteSummonerIdReq,
  ): Promise<void> {
    if (!(await this.isUsedSummonerRecordId(favoriteSummonerIdDto.summonerId)))
      await this.deleteSummonerRecord(favoriteSummonerIdDto.summonerId);
  }

  private async softDeleteFavoriteSummoner(
    userDto: UserReq,
    favoriteSummonerIdDto: FavoriteSummonerIdReq,
  ): Promise<void> {
    const favoriteSummonerId = await this.findFavoriteSummonerId(
      userDto.userId,
      favoriteSummonerIdDto.summonerId,
    );
    await this.favoriteSummonerRepository.softDelete(favoriteSummonerId.id);
  }

  private async saveFavoriteSummoner(
    favoriteSummonerDto: FavoriteSummonerReq,
    userDto: UserReq,
  ): Promise<void> {
    if (
      !(await this.findFavoriteSummonerIdWithSoftDelete(
        userDto.userId,
        favoriteSummonerDto.summonerId,
      ))
    )
      await this.favoriteSummonerRepository.save(
        await favoriteSummonerDto.toFavoriteSummonerEntity(userDto.userId),
      );
  }

  private async restoreFavoriteSummoner(
    favoriteSummonerDto: FavoriteSummonerReq,
    userDto: UserReq,
  ): Promise<void> {
    const favoriteSummonerId = await this.findFavoriteSummonerIdWithSoftDelete(
      userDto.userId,
      favoriteSummonerDto.summonerId,
    );
    if (favoriteSummonerId)
      await this.favoriteSummonerRepository.restore(favoriteSummonerId.id);
  }

  private async checkLimitFavoriteSummoner(userId: number): Promise<void> {
    if (await this.isLimitCountFavoriteSummonerId(userId)) {
      throw new ForbiddenException('즐겨찾기 한도가 초과되었습니다.');
    }
  }

  private async deleteSummonerRecord(summonerId: string): Promise<void> {
    await this.summonerRecordRepository.delete(
      await this.findSummonerRecordBySummonerId(summonerId),
    );
    await this.cacheManager.del(`summonerId:${summonerId}:win`);
    await this.cacheManager.del(`summonerId:${summonerId}:lose`);
    await this.cacheManager.del(`summonerId:${summonerId}:tier`);
  }

  private async saveCacheSummonerRecord(
    favoriteSummonerDto: FavoriteSummonerReq,
  ): Promise<void> {
    const isCachedSummonerRecordWin = await this.cacheManager.get<number>(
      `summonerId:${favoriteSummonerDto.summonerId}:win`,
    );

    if (!isCachedSummonerRecordWin) {
      await this.cacheManager.set(
        `summonerId:${favoriteSummonerDto.summonerId}:win`,
        favoriteSummonerDto.win,
        { ttl: 0 },
      );
    }

    const isCachedSummonerRecordLose = await this.cacheManager.get<number>(
      `summonerId:${favoriteSummonerDto.summonerId}:lose`,
    );

    if (!isCachedSummonerRecordLose) {
      await this.cacheManager.set(
        `summonerId:${favoriteSummonerDto.summonerId}:lose`,
        favoriteSummonerDto.lose,
        { ttl: 0 },
      );
    }

    const isCachedSummonerRecordTier = await this.cacheManager.get<string>(
      `summonerId:${favoriteSummonerDto.summonerId}:tier`,
    );

    if (!isCachedSummonerRecordTier) {
      await this.cacheManager.set(
        `summonerId:${favoriteSummonerDto.summonerId}:tier`,
        favoriteSummonerDto.tier,
        { ttl: 0 },
      );
    }
  }

  private async saveSummonerRecord(
    favoriteSummonerDto: FavoriteSummonerReq,
  ): Promise<void> {
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
