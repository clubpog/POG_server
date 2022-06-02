import { plainToInstance } from 'class-transformer';
import { createQueryBuilder, EntityRepository, Repository } from 'typeorm';
import { ChangedTier } from '@app/entity/domain/changedTier/ChangedTier.entity';

@EntityRepository(ChangedTier)
export class ChangedTierApiQueryRepository extends Repository<ChangedTier> {}
