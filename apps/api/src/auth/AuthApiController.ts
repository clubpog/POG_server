import { ResponseEntity } from '@app/common-config/response/ResponseEntity';
import { Body, Controller, Inject, Post } from '@nestjs/common';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { AuthApiService } from './AuthApiService';
import { AuthSignupReq } from './dto/AuthSignupReq.dto';

@Controller('auth')
export class AuthApiController {
  constructor(
    private readonly authApiService: AuthApiService,
    @Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: Logger,
  ) {}

  @Post('/signup')
  async signup(@Body() dto: AuthSignupReq): Promise<ResponseEntity<string>> {
    try {
      await this.authApiService.signup(await dto.toEntity());
      return ResponseEntity.CREATED();
    } catch (error) {
      this.logger.error(`dto = ${JSON.stringify(dto)}`, error);
      return ResponseEntity.ERROR_WITH('회원가입에 실패했습니다.');
    }
  }
}
