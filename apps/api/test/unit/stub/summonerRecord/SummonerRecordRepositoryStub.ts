import { DeleteResult } from './../../../../../../libs/entity/test/stub/DeleteResultStub';
import { SummonerRecord } from '@app/entity/domain/summonerRecord/SummonerRecord.entity';
import { UpdateResult } from '../../../../../../libs/entity/test/stub/UpdateResultStub';

export class SummonerRecordRepositoryStub {
  private static database = new Map<number, SummonerRecord>();
  private _summonerRecord: SummonerRecord;

  constructor() {
    SummonerRecordRepositoryStub.database.set(1, new SummonerRecord());
  }

  save(summonerRecord: SummonerRecord): SummonerRecord | object {
    SummonerRecordRepositoryStub.database.set(
      summonerRecord.id,
      summonerRecord,
    );
    if (!this._summonerRecord) {
      this._summonerRecord = summonerRecord;
      return this._summonerRecord;
    } else {
      return { severity: 'ERROR', code: '23505' };
    }
  }

  softDelete(summonerId: string) {
    return UpdateResult.Result();
  }

  delete() {
    return DeleteResult.Result();
  }
}
