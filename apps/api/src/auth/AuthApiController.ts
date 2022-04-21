import { SigninNotFoundFailV1 } from './../../../../libs/common-config/src/response/swagger/domain/auth/SigninNotFoundFailV1';
import { SigninFailV1 } from './../../../../libs/common-config/src/response/swagger/domain/auth/SigninFailV1';
import { SignupFailV1 } from './../../../../libs/common-config/src/response/swagger/domain/auth/SignupFailV1';
import { UserAccessToken } from '@app/entity/domain/user/UserAccessToken';
import { SigninFail } from '@app/common-config/response/swagger/domain/auth/SigninFail';
import { SigninSuccess } from '@app/common-config/response/swagger/domain/auth/SigninSuccess';
import { ResponseEntity } from '@app/common-config/response/ResponseEntity';
import { ResponseStatus } from '@app/common-config/response/ResponseStatus';
import { Body, Controller, HttpCode, Post } from '@nestjs/common';
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
import { SignupFail } from '@app/common-config/response/swagger/domain/auth/SignupFail';
import { AuthSigninReq, AuthSignupReq } from './dto';
import { SignupSuccess } from '@app/common-config/response/swagger/domain/auth/SignupSuccess';
import { SigninNotFoundFail } from '@app/common-config/response/swagger/domain/auth/SigninNotFoundFail';
import { SignupUnprocessableEntityFail } from '@app/common-config/response/swagger/domain/auth/SignupUnprocessableEntityFail';

@Controller('auth')
@ApiTags('회원가입, 로그인 API')
export class AuthApiController {
  constructor(private readonly authApiService: AuthApiService) {}

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
  @ApiInternalServerErrorResponse({
    description: '회원 가입에 실패했습니다. 실제 응답 코드는 201을 받습니다.',
    type: SignupFail,
  })
  @Post('/signup')
  async signup(@Body() dto: AuthSignupReq): Promise<ResponseEntity<string>> {
    try {
      await this.authApiService.signup(await dto.toEntity());
      return ResponseEntity.CREATED_WITH('회원 가입에 성공했습니다.');
    } catch (error) {
      return ResponseEntity.ERROR_WITH('회원 가입에 실패했습니다.');
    }
  }

  @ApiOperation({
    summary: '회원 가입 V1',
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
    type: SignupFailV1,
  })
  @Post('/signup/v1')
  async signupV1(@Body() dto: AuthSignupReq): Promise<ResponseEntity<string>> {
    await this.authApiService.signupV1(await dto.toEntity());
    return ResponseEntity.CREATED_WITH('회원 가입에 성공했습니다.');
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
    type: SigninFail,
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
      if (error.status === ResponseStatus.NOT_FOUND)
        return ResponseEntity.NOT_FOUND_WITH(error.message);
      return ResponseEntity.ERROR_WITH('로그인에 실패했습니다.');
    }
  }

  @ApiOperation({
    summary: '로그인 V1',
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
    type: SigninNotFoundFailV1,
  })
  @ApiInternalServerErrorResponse({
    description: '로그인에 실패했습니다.',
    type: SigninFailV1,
  })
  @HttpCode(ResponseStatus.OK)
  @Post('/signin/v1')
  async signinV1(
    @Body() dto: AuthSigninReq,
  ): Promise<ResponseEntity<UserAccessToken | string>> {
    const userId = await this.authApiService.signinV1(await dto.toEntity());
    return ResponseEntity.OK_WITH_DATA<UserAccessToken>(
      '로그인에 성공했습니다.',
      userId,
    );
  }
}
