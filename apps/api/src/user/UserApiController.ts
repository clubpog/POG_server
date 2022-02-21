import { JwtPayload } from '@app/common-config/jwt/JwtPayload';
import { CurrentUser } from '@app/common-config/decorator/UserDecorator';
import { JwtAuthGuard } from '@app/common-config/jwt/JwtGuard';
import { fcmTokenUpdateFail } from '@app/common-config/response/swagger/domain/user/fcmTokenUpdateFail';
import { OkSuccess } from '@app/common-config/response/swagger/common/OkSuccess';
import { UserUpdateFcmTokenReq } from './dto/UserUpdateFcmTokenReq.dto';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { UserApiService } from './UserApiService';
import { Body, Controller, Inject, Put, UseGuards } from '@nestjs/common';
import { Logger } from 'winston';
import { ResponseEntity } from '@app/common-config/response/ResponseEntity';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { UserUpdatePushReq } from './dto/UserUpdatePushReq.dto';
import { pushUpdateFail } from '@app/common-config/response/swagger/domain/user/pushUpdateFail';
import { UnauthorizedError } from '@app/common-config/response/swagger/common/error/UnauthorizedError';
import { BadRequestError } from '@app/common-config/response/swagger/common/error/BadRequestError';

@Controller('user')
@ApiTags('유저 API')
export class UserApiController {
  constructor(
    private readonly userApiService: UserApiService,
    @Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: Logger,
  ) {}

  @ApiOperation({
    summary: 'FCM 토큰 수정',
    description: `
    FCM 토큰 수정 시 deviceId, firebaseToken를 입력받습니다. \n
    FCM 토큰 수정 시 입력값을 누락한 경우 400 에러를 출력합니다. \n
    헤더에 토큰 값을 제대로 설정하지 않으면 401 에러를 출력합니다. \n
    `,
  })
  @ApiOkResponse({
    description: 'FCM 토큰 수정에 성공했습니다.',
    type: OkSuccess,
  })
  @ApiUnauthorizedResponse({
    description: '잘못된 Authorization입니다.',
    type: UnauthorizedError,
  })
  @ApiBadRequestResponse({
    description: '입력 값을 누락했습니다.',
    type: BadRequestError,
  })
  @ApiInternalServerErrorResponse({
    description: 'FCM 토큰 수정에 실패했습니다.',
    type: fcmTokenUpdateFail,
  })
  @ApiBearerAuth('Authorization')
  @UseGuards(JwtAuthGuard)
  @Put('/fcmToken')
  async updateFcmToken(
    @CurrentUser() userDto: JwtPayload,
    @Body() userUpdateFcmTokenDto: UserUpdateFcmTokenReq,
  ): Promise<ResponseEntity<string>> {
    try {
      await this.userApiService.updateFcmToken(userUpdateFcmTokenDto, userDto);
      return ResponseEntity.OK();
    } catch (error) {
      this.logger.error(
        `dto = ${JSON.stringify(userUpdateFcmTokenDto)}`,
        error,
      );
      return ResponseEntity.ERROR_WITH('FCM 토큰 수정에 실패했습니다.');
    }
  }

  @ApiOperation({
    summary: '푸시알림 허용 여부 수정',
    description: `
    푸시알림 허용 여부 수정 시 deviceId, isPush를 입력받습니다. \n
    푸시알림 허용 여부 수정 시 입력값을 누락한 경우 400 에러를 출력합니다. \n
    헤더에 토큰 값을 제대로 설정하지 않으면 401 에러를 출력합니다. \n
    `,
  })
  @ApiOkResponse({
    description: '푸시알림 허용 여부 수정에 성공했습니다.',
    type: OkSuccess,
  })
  @ApiUnauthorizedResponse({
    description: '잘못된 Authorization입니다.',
    type: UnauthorizedError,
  })
  @ApiBadRequestResponse({
    description: '입력 값을 누락했습니다.',
    type: BadRequestError,
  })
  @ApiInternalServerErrorResponse({
    description: '푸시알림 허용 여부 수정에 실패했습니다.',
    type: pushUpdateFail,
  })
  @ApiBearerAuth('Authorization')
  @UseGuards(JwtAuthGuard)
  @Put('/push')
  async updatePush(
    @CurrentUser() userDto: JwtPayload,
    @Body() userUpdatePushDto: UserUpdatePushReq,
  ): Promise<ResponseEntity<string>> {
    try {
      await this.userApiService.updatePush(userUpdatePushDto, userDto);
      return ResponseEntity.OK();
    } catch (error) {
      this.logger.error(`dto = ${JSON.stringify(userUpdatePushDto)}`, error);
      return ResponseEntity.ERROR_WITH(
        '푸시알림 허용 여부 수정에 실패했습니다.',
      );
    }
  }
}
