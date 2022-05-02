/* eslint-disable @typescript-eslint/ban-types */
import { IBullService } from '../../src/lib/interface/IBullService';

export class BullServiceStub implements IBullService {
  public createJob(task: any, data: Object, opts?: any) {}
}
