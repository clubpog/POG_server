import { BullModule } from '@nestjs/bull';

export function getBullQueue() {
  return BullModule.registerQueue({
    name: 'PushQueue',
  });
}
