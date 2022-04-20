import { NotFoundError } from '@app/common-config/response/swagger/common/error/NotFoundError';
import { ApiExtraModels, ApiProperty, PickType } from '@nestjs/swagger';

@ApiExtraModels()
export class FavoriteSummonerDeleteNotFound extends PickType(NotFoundError, [
  'statusCode',
  'message',
] as const) {
  @ApiProperty({
    type: 'string',
    title: '실패 메시지',
    example: '삭제할 즐겨찾기를 조회할 수 없습니다.',
    description:
      '소환사 즐겨찾기 취소 시 삭제할 즐겨찾기를 조회할 수 없습니다.',
  })
  data: string;
}
