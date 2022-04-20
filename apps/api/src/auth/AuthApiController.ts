import { SignupUnprocessableEntityFail } from './../../../../libs/common-config/src/response/swagger/domain/auth/SignupUnprocessableEntityFail';
import { InternalServerError } from '@app/common-config/response/swagger/common/error/InternalServerError';
import { UserAccessToken } from '@app/entity/domain/user/UserAccessToken';
import { SigninSuccess } from '@app/common-config/response/swagger/domain/auth/SigninSuccess';
import { ResponseEntity } from '@app/common-config/response/ResponseEntity';
import { ResponseStatus } from '@app/common-config/response/ResponseStatus';
import { Body, Controller, HttpCode, Inject, Post } from '@nestjs/common';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { AuthApiService } from './AuthApiService';
import {
  ApiOperation,
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiCreatedResponse,
  ApiTags,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { BadRequestError } from '@app/common-config/response/swagger/common/error/BadRequestError';
import { AuthSigninReq, AuthSignupReq } from './dto';
import { SignupSuccess } from '@app/common-config/response/swagger/domain/auth/SignupSuccess';
import { SigninNotFoundFail } from '@app/common-config/response/swagger/domain/auth/SigninNotFoundFail';

@Controller('auth')
@ApiTags('회원가입, 로그인 API')
export class AuthApiController {
  constructor(
    private readonly authApiService: AuthApiService,
    @Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: Logger,
  ) {}

  @ApiOperation({
    summary: '회원 가입',
    description: `
    회원 가입할 때 deviceId, firebaseToken을 입력받습니다. \n
    회원 가입할 때 입력값을 누락한 경우 에러를 출력합니다. \n
    `,
  })
  @ApiCreatedResponse({
    description: '회원 가입에 성공했습니다.',
    type: SignupSuccess,
  })
  @ApiBadRequestResponse({
    description: '입력값을 누락한 경우 입니다.',
    type: BadRequestError,
  })
  @ApiUnprocessableEntityResponse({
    description: '이미 DB에 있는 deviceId를 입력했습니다.',
    type: SignupUnprocessableEntityFail,
  })
  @ApiInternalServerErrorResponse({
    description: '회원 가입에 실패했습니다.',
    type: InternalServerError,
  })
  @Post('/signup')
  async signup(@Body() dto: AuthSignupReq): Promise<ResponseEntity<string>> {
    try {
      await this.authApiService.signup(await dto.toEntity());
      return ResponseEntity.CREATED_WITH('회원 가입에 성공했습니다.');
    } catch (error) {
      this.logger.error(`dto = ${JSON.stringify(dto)}`, error);
      throw error;
    }
  }

  @ApiOperation({
    summary: '로그인',
    description: `
    로그인할 때 deviceId를 입력받습니다. \n
    로그인할 때 입력값을 누락한 경우 400 에러를 출력합니다. \n
    로그인할 때 deviceId가 DB에 저장되어 있지 않다면 404 에러를 출력합니다. \n
    `,
  })
  @ApiOkResponse({
    description: '로그인에 성공했습니다.',
    type: SigninSuccess,
  })
  @ApiNotFoundResponse({
    description: '입력한 deviceId는 DB에 저장되어 있지 않습니다.',
    type: SigninNotFoundFail,
  })
  @ApiInternalServerErrorResponse({
    description: '로그인에 실패했습니다.',
    type: InternalServerError,
  })
  @HttpCode(ResponseStatus.OK)
  @Post('/signin')
  async signin(
    @Body() dto: AuthSigninReq,
  ): Promise<ResponseEntity<UserAccessToken | string>> {
    try {
      const userId = await this.authApiService.signin(await dto.toEntity());
      return ResponseEntity.OK_WITH_DATA<UserAccessToken>(
        '로그인에 성공했습니다.',
        userId,
      );
    } catch (error) {
      this.logger.error(`dto = ${JSON.stringify(dto)}`, error);
      throw error;
    }
  }
}
