import { ResponseEntity } from '@app/common-config/response/ResponseEntity';
import { Controller, Get, Inject } from '@nestjs/common';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { PushApiService } from './PushApiService';

@Controller()
export class PushApiController {
  constructor(
    private readonly pushApiService: PushApiService,
    @Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: Logger,
  ) {}

  @Get('queue')
  async addMessage(): Promise<ResponseEntity<string>> {
    try {
      await this.pushApiService.addMessageQueue();
      return ResponseEntity.OK_WITH('메시지 전송에 성공했습니다.');
    } catch (error) {
      this.logger.error(error);
      return ResponseEntity.ERROR_WITH('메시지 전송에 실패했습니다.');
    }
  }
}
