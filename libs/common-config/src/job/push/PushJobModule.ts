import { Module } from '@nestjs/common';
import { PushJobService } from './PushJobService';

@Module({
  providers: [PushJobService],
  exports: [PushJobService],
})
export class PushJobModule {}
