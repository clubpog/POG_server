import { fcmTokenUpdateFail } from './../../../../libs/common-config/src/response/swagger/domain/user/fcmTokenUpdateFail';
import { OkSuccess } from './../../../../libs/common-config/src/response/swagger/common/OkSuccess';
import { UserUpdateFcmTokenReq } from './dto/UserUpdateFcmTokenReq.dto';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { UserApiService } from './UserApiService';
import { Body, Controller, Inject, Put } from '@nestjs/common';
import { Logger } from 'winston';
import { ResponseEntity } from '@app/common-config/response/ResponseEntity';
import { ResponseStatus } from '@app/common-config/response/ResponseStatus';
import {
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { NotFoundError } from '@app/common-config/response/swagger/common/error/NotFoundError';

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
    FCM 토큰 수정 시 deviceId가 DB에 저장되어 있지 않다면 404 에러를 출력합니다. \n
    `,
  })
  @ApiOkResponse({
    description: 'FCM 토큰 수정에 성공했습니다.',
    type: OkSuccess,
  })
  @ApiNotFoundResponse({
    description: '입력한 deviceId는 DB에 저장되어 있지 않습니다.',
    type: NotFoundError,
  })
  @ApiInternalServerErrorResponse({
    description: '로그인에 실패했습니다.',
    type: fcmTokenUpdateFail,
  })
  @Put('/fcmToken')
  async updateFcmToken(
    @Body() dto: UserUpdateFcmTokenReq,
  ): Promise<ResponseEntity<string>> {
    try {
      await this.userApiService.updateFcmToken(await dto.toEntity());
      return ResponseEntity.OK();
    } catch (error) {
      this.logger.error(`dto = ${JSON.stringify(dto)}`, error);
      if (error.status === ResponseStatus.NOT_FOUND)
        return ResponseEntity.NOT_FOUND_WITH(
          '입력된 deviceId가 존재하지 않습니다.',
        );
      return ResponseEntity.ERROR_WITH('FCM 토큰 수정에 실패했습니다.');
    }
  }
}
