import { SummonerRecordId } from '@app/entity/domain/summonerRecord/SummonerRecordId';
import { FavoriteSummonerApiQueryRepository } from './FavoriteSummonerApiQueryRepository';
import { FavoriteSummonerReq } from './dto/FavoriteSummonerReq.dto';
import {
  ForbiddenException,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Repository, Connection, QueryRunner } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { FavoriteSummoner } from '@app/entity/domain/favoriteSummoner/FavoriteSummoner.entity';
import { SummonerRecordApiQueryRepository } from '../summonerRecord/SummonerRecordApiQueryRepository';
import { SummonerRecord } from '@app/entity/domain/summonerRecord/SummonerRecord.entity';
import { UserReq } from '../user/dto/UserReq.dto';
import { FavoriteSummonerIdReq } from './dto/FavoriteSummonerIdReq.dto';
import { FavoriteSummonerId } from '@app/entity/domain/favoriteSummoner/FavoriteSummonerId';
import { User } from '@app/entity/domain/user/User.entity';
import { FavoriteSummonerRes } from './dto/FavoriteSummonerRes.dto';

import { EInfrastructureInjectionToken } from '@app/common-config/enum/InfrastructureInjectionToken';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { IEventStoreService } from '../../../../libs/cache/interface/integration';
import { FavoriteSummonerChangedTierReq } from './dto/FavoriteSummonerChangedTierReq.dto';
import { ChangedTierApiQueryRepository } from '../changedTier/ChangedTierApiQueryRepository';
import { FavoriteSummonerChangedTierQuery } from './dto/FavoriteSummonerChangedTierQuery.dto';
import { IFavoriteSummonerChangedTierReadSuccess } from '../changedTier/interface/IChangedTierReadSuccess';
import { FavoriteSummonerChangedTierRes } from './dto/FavoriteSummonerChangedTierRes.dto';

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
    private readonly redisClient?: IEventStoreService,
    @Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger?: Logger,
    private readonly connection?: Connection,
    private readonly changedTierApiQueryRepository?: ChangedTierApiQueryRepository,
  ) {}

  async createFavoriteSummoner(
    userDto: UserReq,
    favoriteSummonerDto: FavoriteSummonerReq,
  ): Promise<void> {
    await this.checkLimitFavoriteSummoner(userDto.userId);
    await this.redisClient.saveRedisSummonerRecord(favoriteSummonerDto);

    const [isFindSummonerRecordId, favoriteSummonerId] = await Promise.all([
      await this.isSummonerRecordBySummonerId(favoriteSummonerDto.summonerId),
      await this.findFavoriteSummonerIdWithSoftDelete(
        userDto.userId,
        favoriteSummonerDto.summonerId,
      ),
    ]);

    await this.saveOrRestoreTransaction(
      isFindSummonerRecordId,
      favoriteSummonerId,
      favoriteSummonerDto,
      userDto,
    );
  }

  async createFavoriteSummonerV1(
    userDto: UserReq,
    favoriteSummonerDto: FavoriteSummonerReq,
  ): Promise<void> {
    try {
      await this.checkLimitFavoriteSummoner(userDto.userId);
      await this.redisClient.saveRedisSummonerRecord(favoriteSummonerDto);

      const [isFindSummonerRecordId, favoriteSummonerId] = await Promise.all([
        await this.isSummonerRecordBySummonerId(favoriteSummonerDto.summonerId),
        await this.findFavoriteSummonerIdWithSoftDelete(
          userDto.userId,
          favoriteSummonerDto.summonerId,
        ),
      ]);

      await this.saveOrRestoreTransaction(
        isFindSummonerRecordId,
        favoriteSummonerId,
        favoriteSummonerDto,
        userDto,
      );
    } catch (error) {
      this.logger.error(
        `userDto = ${JSON.stringify(
          userDto,
        )}, favoriteSummonerDto = ${JSON.stringify(favoriteSummonerDto)}`,
        error,
      );
      if (error instanceof ForbiddenException) {
        throw new ForbiddenException('즐겨찾기 한도가 초과되었습니다.');
      }
      throw new InternalServerErrorException();
    }
  }

  async getChangedTier(
    queryDto: FavoriteSummonerChangedTierQuery,
    favoriteSummonerChangedTierDto: FavoriteSummonerChangedTierReq,
  ): Promise<FavoriteSummonerChangedTierRes[]> {
    try {
      const array = [];
      for (const summonerId of favoriteSummonerChangedTierDto.summonerId) {
        array.push({
          summonerId: await this.findFavoriteSummonersChangedTier(
            summonerId,
            queryDto.getOffset(),
            queryDto.getLimit(),
          ),
        });
      }
      return array;
    } catch (error) {
      this.logger.error(
        `favoriteSummonerDto = ${JSON.stringify(
          favoriteSummonerChangedTierDto,
        )}`,
        error,
      );
      throw new InternalServerErrorException();
    }
  }

  private async findFavoriteSummonersChangedTier(
    summonerId: string,
    offset: number,
    limit: number,
  ) {
    return await this.changedTierApiQueryRepository.findChangedTierByPagination(
      summonerId,
      offset,
      limit,
    );
  }

  async deleteFavoriteSummoner(
    userDto: UserReq,
    favoriteSummonerIdDto: FavoriteSummonerIdReq,
  ): Promise<void> {
    await this.checkNotFoundFavoriteSummoner(userDto, favoriteSummonerIdDto);
    await this.softDeleteFavoriteSummoner(userDto, favoriteSummonerIdDto);
    await this.deleteNoUseSummonerRecord(favoriteSummonerIdDto);
  }

  async deleteFavoriteSummonerV1(
    userDto: UserReq,
    favoriteSummonerIdDto: FavoriteSummonerIdReq,
  ): Promise<void> {
    try {
      await this.checkNotFoundFavoriteSummoner(userDto, favoriteSummonerIdDto);
      await this.softDeleteFavoriteSummoner(userDto, favoriteSummonerIdDto);
      await this.deleteNoUseSummonerRecord(favoriteSummonerIdDto);
    } catch (error) {
      this.logger.error(
        `userDto = ${JSON.stringify(
          userDto,
        )}, favoriteSummonerIdDto = ${JSON.stringify(favoriteSummonerIdDto)}`,
        error,
      );
      if (error instanceof NotFoundException) {
        throw new NotFoundException('삭제할 즐겨찾기를 조회할 수 없습니다.');
      }
      throw new InternalServerErrorException();
    }
  }

  async getFavoriteSummoner(userDto: User): Promise<FavoriteSummonerRes[]> {
    return await this.findAllFavoriteSummoners(userDto.id);
  }

  async getFavoriteSummonerV1(userDto: User): Promise<FavoriteSummonerRes[]> {
    try {
      return await this.findAllFavoriteSummoners(userDto.id);
    } catch (error) {
      this.logger.error(`userDto = ${JSON.stringify(userDto)}`, error);
      throw new InternalServerErrorException();
    }
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
    favoriteSummonerId: FavoriteSummonerId,
    favoriteSummonerDto: FavoriteSummonerReq,
    userDto: UserReq,
    queryRunner: QueryRunner,
  ): Promise<void> {
    if (!favoriteSummonerId)
      await queryRunner.manager.save(
        await favoriteSummonerDto.toFavoriteSummonerEntity(userDto.userId),
      );
  }

  private async restoreFavoriteSummoner(
    favoriteSummonerId: FavoriteSummonerId,
    queryRunner: QueryRunner,
  ): Promise<void> {
    if (favoriteSummonerId) {
      await queryRunner.manager.restore(
        FavoriteSummoner,
        favoriteSummonerId.id,
      );
    }
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
    await this.redisClient.removeTransactionRedis(summonerId);
  }

  private async saveSummonerRecord(
    isFindSummonerRecordId: boolean,
    favoriteSummonerDto: FavoriteSummonerReq,
    queryRunner: QueryRunner,
  ): Promise<void> {
    if (!isFindSummonerRecordId) {
      await queryRunner.manager.save(
        await favoriteSummonerDto.toSummonerRecordEntity(),
      );
    }
  }

  private async saveOrRestoreTransaction(
    isFindSummonerRecordId: boolean,
    favoriteSummonerId: FavoriteSummonerId,
    favoriteSummonerDto: FavoriteSummonerReq,
    userDto: UserReq,
  ) {
    const queryRunner: QueryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      await this.saveSummonerRecord(
        isFindSummonerRecordId,
        favoriteSummonerDto,
        queryRunner,
      );
      await this.saveFavoriteSummoner(
        favoriteSummonerId,
        favoriteSummonerDto,
        userDto,
        queryRunner,
      );
      await this.restoreFavoriteSummoner(favoriteSummonerId, queryRunner);
      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
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
