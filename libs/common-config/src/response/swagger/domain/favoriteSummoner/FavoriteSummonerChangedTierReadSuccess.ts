import { ApiExtraModels, ApiProperty, PickType } from '@nestjs/swagger';
import { FavoriteSummonerChangedTierRes } from '../../../../../../../apps/api/src/favoriteSummoner/dto/FavoriteSummonerChangedTierRes.dto';
import { OkSuccess } from '../../common/OkSuccess';

@ApiExtraModels()
export class FavoriteSummonerChangedTierReadSuccess extends PickType(
  OkSuccess,
  ['statusCode'] as const,
) {
  @ApiProperty({
    type: 'string',
    title: '성공 메시지',
    example: '소환사 전적 갱신 조회에 성공했습니다.',
    description: '소환사 전적 갱신 조회에 성공했습니다.',
  })
  message: string;

  @ApiProperty({
    type: FavoriteSummonerChangedTierRes,
    title: '성공 메시지',
    example: [
      {
        summonerId: [
          {
            id: '61',
            match_id: 'KR_5934122430',
            tier: 'GRANDMASTER',
            rank: 'I',
            summoner_id:
              'GDjFzPPZ3PiiAmPCblXDLv2yRh430fyVjWlpC8zAXaDp9o12bpOZCzfnsw',
            status: 'tierUp',
          },
          {
            id: '60',
            match_id: 'KR_5934122430',
            tier: 'GRANDMASTER',
            rank: 'I',
            summoner_id:
              'GDjFzPPZ3PiiAmPCblXDLv2yRh430fyVjWlpC8zAXaDp9o12bpOZCzfnsw',
            status: 'tierUp',
          },
        ],
      },
      {
        summonerId: [
          {
            id: '63',
            match_id: 'KR_5933496322',
            tier: 'CHALLENGER',
            rank: 'I',
            summoner_id:
              '8_MjoUjTvMvLLAHQj1PgSCV46Ux1hkGxOy2adI_s2OepAuremBy9ACAmKQ',
            status: 'tierUp',
          },
          {
            id: '57',
            match_id: 'KR_5933496322',
            tier: 'CHALLENGER',
            rank: 'I',
            summoner_id:
              '8_MjoUjTvMvLLAHQj1PgSCV46Ux1hkGxOy2adI_s2OepAuremBy9ACAmKQ',
            status: 'tierUp',
          },
        ],
      },
    ],
    description: '소환사 전적 갱신 조회에 성공했습니다.',
  })
  data: FavoriteSummonerChangedTierRes[];
}
