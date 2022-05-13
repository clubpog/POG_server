import { QueryRunnerStub } from './QueryRunnerStub';

export class ConnectionStub {
  createQueryRunner() {
    return new QueryRunnerStub();
  }
}
