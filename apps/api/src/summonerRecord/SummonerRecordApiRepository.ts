import { SummonerRecord } from '@app/entity/domain/summonerRecord/SummonerRecord.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(SummonerRecord)
export class SummonerRecordApiRepository extends Repository<SummonerRecord> {}
