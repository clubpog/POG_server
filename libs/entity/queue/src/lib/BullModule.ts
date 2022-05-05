import { Module } from '@nestjs/common';
import { BullService } from './BullService';
import { BullTaskRegisterService } from './BullTaskRegisterService';

@Module({
  providers: [BullService, BullTaskRegisterService],
  exports: [BullService, BullTaskRegisterService],
})
export class BullModule {}
