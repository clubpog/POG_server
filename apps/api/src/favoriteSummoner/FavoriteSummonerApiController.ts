import { JwtPayload } from '@app/common-config/jwt/JwtPayload';
import { CurrentUser } from '@app/common-config/decorator/UserDecorator';
import { FavoriteSummonerIdReq } from './dto/FavoriteSummonerIdReq.dto';
import { JwtAuthGuard } from '@app/common-config/jwt/JwtGuard';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { Body, Controller, Inject, Post, Put, UseGuards } from '@nestjs/common';
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
import { FavoriteSummonerApiService } from './FavoriteSummonerApiService';
import { SummonerRecord } from '@app/entity/domain/summonerRecord/SummonerRecord.entity';

@Controller('favoriteSummoner')
@ApiTags('소환사 즐겨찾기 API')
export class FavoriteSummonerApiController {
  constructor(
    private readonly favoriteSummonerApiService: FavoriteSummonerApiService,
    @Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: Logger,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async createFollow(
    @CurrentUser() userDto: JwtPayload,
    @Body() favoriteSummonerIdDto: FavoriteSummonerIdReq,
  ) {
    try {
      await this.favoriteSummonerApiService.createFavoriteSummoner(
        userDto,
        favoriteSummonerIdDto,
      );
      return ResponseEntity.CREATED_WITH(
        '소환사 즐겨찾기 추가에 성공했습니다.',
      );
    } catch (error) {
      this.logger.error(
        `dto = ${JSON.stringify(favoriteSummonerIdDto)}`,
        error,
      );
      return ResponseEntity.ERROR_WITH('소환사 즐겨찾기 추가에 실패했습니다.');
    }
  }
}
