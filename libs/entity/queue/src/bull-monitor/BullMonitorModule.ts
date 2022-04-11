import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { getBullQueue } from '../../getBullQueue';
import { BullMonitorService } from './BullMonitorService';

@Module({
  imports: [getBullQueue()],
  providers: [BullMonitorService],
})
export class BullMonitorModule implements NestModule {
  constructor(private monitor: BullMonitorService) {}
  async configure(consumer: MiddlewareConsumer) {
    await this.monitor.init();
    consumer.apply(this.monitor.router).forRoutes('/monitor');
  }
}
