import { ManagerStub } from './ManagerStub';
import { UpdateResult } from './UpdateResultStub';

export class QueryRunnerStub {
  private manager = new ManagerStub();

  softDelete() {
    return UpdateResult.Result();
  }

  connect() {
    return;
  }

  startTransaction() {
    return;
  }

  commitTransaction() {
    return;
  }

  rollbackTransaction() {
    return;
  }

  release() {
    return;
  }
}
