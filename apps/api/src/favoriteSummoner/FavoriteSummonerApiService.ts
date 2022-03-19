import { SummonerRecordId } from './../../../../libs/entity/src/domain/summonerRecord/SummonerRecordId';
import { JwtPayload } from '@app/common-config/jwt/JwtPayload';
import { FavoriteSummonerIdReq } from './dto/FavoriteSummonerIdReq.dto';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { FavoriteSummoner } from '@app/entity/domain/favoriteSummoner/FavoriteSummoner.entity';
import { SummonerRecordApiQueryRepository } from '../summonerRecord/SummonerRecordApiQueryRepository';
import { SummonerRecord } from '@app/entity/domain/summonerRecord/SummonerRecord.entity';

@Injectable()
export class FavoriteSummonerApiService {
  constructor(
    @InjectRepository(FavoriteSummoner)
    private favoriteSummonerRepository?: Repository<FavoriteSummoner>,
    @InjectRepository(SummonerRecord)
    private summonerRecordRepository?: Repository<SummonerRecord>,
    private readonly summonerRecordApiQueryRepository?: SummonerRecordApiQueryRepository,
  ) {}

  async createFavoriteSummoner(
    userDto: JwtPayload,
    favoriteSummonerDto: FavoriteSummonerIdReq,
  ): Promise<void> {
    const foundSummonerRecordId = await this.findSummonerRecordBySummonerId(
      favoriteSummonerDto.summonerId,
    );
    console.log(foundSummonerRecordId);
    if (foundSummonerRecordId === undefined) {
      this.summonerRecordRepository.save(
        await SummonerRecord.createSummonerRecord(
          'test',
          'test',
          1,
          1,
          'test',
          'test',
          favoriteSummonerDto.summonerId,
          1,
          'test',
        ),
      );
    }

    // summonerId를 활용해서 먼저 summonerRecord 테이블의 데이터가 있는지 확인한다.
    // 만약 데이터가 없다면, 라이엇 API를 활용해서 조회한다.
    // 라이엇 API를 통해서 얻은 데이터를 활용해서 SummonerRecord 엔티티로 변환한 후, summonerRecord에 데이터를 저장한다.
    // 데이터가 있다면, 바로 저장.
    const toEntity = await FavoriteSummoner.createFavoriteSummoner(
      userDto.userId,
      favoriteSummonerDto.summonerId,
    );
    console.log(toEntity);
    await this.favoriteSummonerRepository.save(toEntity);
  }

  async findSummonerRecordBySummonerId(
    summonerId: string,
  ): Promise<SummonerRecordId> {
    return await this.summonerRecordApiQueryRepository.findUserIdByDeviceId(
      summonerId,
    );
  }
}
