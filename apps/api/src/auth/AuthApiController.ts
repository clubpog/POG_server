import { CustomValidationError } from '@app/common-config/filter/CustomValidationError';
import { ResponseEntity } from '@app/common-config/response/ResponseEntity';
import { Body, Controller, Inject, Post, Res } from '@nestjs/common';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { AuthApiService } from './AuthApiService';
import { AuthSignupReq } from './dto/AuthSignupReq.dto';
import {
  ApiOperation,
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiCreatedResponse,
} from '@nestjs/swagger';
import { BadRequestError } from '@app/common-config/response/error/BadRequestError';

@Controller('auth')
export class AuthApiController {
  constructor(
    private readonly authApiService: AuthApiService,
    @Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: Logger,
  ) {}

  @ApiOperation({
    summary: '회원 가입',
    description: `
    회원 가입할 때 deviceId, firebaseToken, isPush을 입력받습니다. \n
    회원 가입할 때 입력값을 누락한 경우 에러를 출력합니다. \n
    `,
  })
  @ApiCreatedResponse({
    description: '회원 가입에 성공했습니다.',
    type: ResponseEntity,
  })
  @ApiBadRequestResponse({
    description: '입력값을 누락한 경우 입니다.',
    type: BadRequestError,
  })
  @ApiInternalServerErrorResponse({
    description: '회원 가입에 실패했습니다. 실제 응답 코드는 201을 받습니다.',
    type: ResponseEntity,
  })
  @Post('/signup')
  async signup(@Body() dto: AuthSignupReq): Promise<ResponseEntity<string>> {
    try {
      await this.authApiService.signup(await dto.toEntity());
      return ResponseEntity.CREATED();
    } catch (error) {
      this.logger.error(`dto = ${JSON.stringify(dto)}`, error);
      return ResponseEntity.ERROR_WITH('회원 가입에 실패했습니다.');
    }
  }
}
