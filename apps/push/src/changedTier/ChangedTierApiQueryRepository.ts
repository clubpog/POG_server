import { plainToInstance } from 'class-transformer';
import { SummonerRecord } from '@app/entity/domain/summonerRecord/SummonerRecord.entity';
import { createQueryBuilder, EntityRepository, Repository } from 'typeorm';
import { ChangedTier } from '@app/entity/domain/changedTier/ChangedTier.entity';

@EntityRepository(ChangedTier)
export class ChangedTierApiQueryRepository extends Repository<SummonerRecord> {}
