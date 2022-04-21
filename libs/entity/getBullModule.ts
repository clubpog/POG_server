import { ConfigService } from './config/configService';
import { BullModule } from '@nestjs/bull';

export function getBullModule() {
  return BullModule.forRoot(ConfigService.bullConfig());
}
