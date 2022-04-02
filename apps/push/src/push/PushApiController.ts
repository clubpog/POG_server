import { ResponseEntity } from '@app/common-config/response/ResponseEntity';
import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { Job } from 'bull';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { PushApiService } from './PushApiService';

@Controller()
export class PushApiController {
  constructor(
    private readonly pushApiService: PushApiService,
    @Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: Logger,
  ) {}

  @Post('queue')
  async addMessage(
    @Body() data: number,
  ): Promise<ResponseEntity<Job | string>> {
    try {
      const res = await this.pushApiService.addMessageQueue(data);
      return ResponseEntity.OK_WITH_DATA('메시지 전송에 성공했습니다.', res);
    } catch (error) {
      this.logger.error(`dto = ${JSON.stringify(data)}`, error);
      return ResponseEntity.ERROR_WITH('메시지 전송에 실패했습니다.');
    }
  }

  @Get('cache')
  async getCache(): Promise<ResponseEntity<string>> {
    try {
      const res = await this.pushApiService.cacheTest();
      return ResponseEntity.OK_WITH_DATA('캐시 테스트에 성공했습니다.', res);
    } catch (error) {
      this.logger.error(error);
      return ResponseEntity.ERROR_WITH('캐시 테스트에 실패했습니다.');
    }
  }
}
