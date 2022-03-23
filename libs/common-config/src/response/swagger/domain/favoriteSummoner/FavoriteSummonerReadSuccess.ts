import { ApiExtraModels, ApiProperty, PickType } from '@nestjs/swagger';
import { FavoriteSummonerRes } from '../../../../../../../apps/api/src/favoriteSummoner/dto/FavoriteSummonerRes.dto';
import { OkSuccess } from '../../common/OkSuccess';

@ApiExtraModels()
export class FavoriteSummonerReadSuccess extends PickType(OkSuccess, [
  'statusCode',
] as const) {
  @ApiProperty({
    type: 'string',
    title: '성공 메시지',
    example: '소환사 즐겨찾기 조회에 성공했습니다.',
    description: '소환사 즐겨찾기 조회에 성공했습니다.',
  })
  message: string;

  @ApiProperty({
    type: FavoriteSummonerRes,
    title: '성공 메시지',
    example: [
      {
        id: '44',
        name: 'test',
        tier: 'test',
        win: '1',
        lose: '1',
        puuid: 'test',
        rank: 'test',
        profileIconId: 'test',
        summonerId: 'test3',
        leaguePoint: 1,
      },
      {
        id: '45',
        name: 'test',
        tier: 'test',
        win: '1',
        lose: '1',
        puuid: 'test',
        rank: 'test',
        profileIconId: 'test',
        summonerId: 'test2',
        leaguePoint: 1,
      },
    ],
    description: '소환사 즐겨찾기 조회에 성공했습니다.',
  })
  data: FavoriteSummonerRes[];
}
