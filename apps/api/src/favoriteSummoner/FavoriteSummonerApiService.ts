import { SummonerRecordId } from '@app/entity/domain/summonerRecord/SummonerRecordId';
import { FavoriteSummonerApiQueryRepository } from './FavoriteSummonerApiQueryRepository';
import { FavoriteSummonerReq } from './dto/FavoriteSummonerReq.dto';
import {
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

import Redis from 'ioredis';
import { EInfrastructureInjectionToken } from '@app/common-config/enum/InfrastructureInjectionToken';

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
    @Inject(EInfrastructureInjectionToken.EVENT_STORE.name)
    private readonly redisClient?: Redis,
  ) {}

  async createFavoriteSummoner(
    userDto: UserReq,
    favoriteSummonerDto: FavoriteSummonerReq,
  ): Promise<void> {
    await this.checkLimitFavoriteSummoner(userDto.userId);
    await this.saveRedisSummonerRecord(favoriteSummonerDto);
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

  private async removeTransactionRedis(
    redisClient: Redis,
    summonerId: string,
  ): Promise<void> {
    await redisClient.multi({ pipeline: false });
    await redisClient.del(`summonerId:${summonerId}:win`);
    await redisClient.del(`summonerId:${summonerId}:lose`);
    await redisClient.del(`summonerId:${summonerId}:tier`);
    await redisClient.srem('summonerId', summonerId);
    await redisClient.exec();
  }

  private async deleteSummonerRecord(summonerId: string): Promise<void> {
    await this.summonerRecordRepository.delete(
      await this.findSummonerRecordBySummonerId(summonerId),
    );
    await this.removeTransactionRedis(await this.getRedisClient(), summonerId);
  }

  private async saveRedisSummonerRecord(
    favoriteSummonerDto: FavoriteSummonerReq,
  ): Promise<void> {
    const redisClient = await this.getRedisClient();

    const [win, lose, tier] = await redisClient.mget([
      `summonerId:${favoriteSummonerDto.summonerId}:win`,
      `summonerId:${favoriteSummonerDto.summonerId}:lose`,
      `summonerId:${favoriteSummonerDto.summonerId}:tier`,
    ]);

    if (!win)
      await redisClient.set(
        `summonerId:${favoriteSummonerDto.summonerId}:win`,
        favoriteSummonerDto.win,
      );

    if (!lose)
      await redisClient.set(
        `summonerId:${favoriteSummonerDto.summonerId}:lose`,
        favoriteSummonerDto.lose,
      );

    if (!tier)
      await redisClient.set(
        `summonerId:${favoriteSummonerDto.summonerId}:tier`,
        favoriteSummonerDto.tier,
      );

    await redisClient.sadd('summonerId', favoriteSummonerDto.summonerId);
  }

  private async getRedisClient(): Promise<Redis> {
    return this.redisClient['master'];
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
