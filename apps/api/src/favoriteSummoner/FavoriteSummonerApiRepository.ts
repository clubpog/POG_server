import { FavoriteSummoner } from '@app/entity/domain/favoriteSummoner/FavoriteSummoner.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(FavoriteSummoner)
export class FavoriteSummonerApiRepository extends Repository<FavoriteSummoner> {}
