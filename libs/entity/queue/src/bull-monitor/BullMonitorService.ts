import { BullMonitorExpress } from '@bull-monitor/express';
import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { BullAdapter } from '@bull-monitor/root/dist/bull-adapter';

@Injectable()
export class BullMonitorService extends BullMonitorExpress {
  constructor(@InjectQueue('testQueue') testQueue: Queue) {
    super({ queues: [new BullAdapter(testQueue)] });
  }
}
