type FavoriteSummonerChangedTierReadSuccessData = {
  id: string;
  match_id: string;
  tier: string;
  rank: string;
  summoner_id: string;
  status: string;
};

export interface IFavoriteSummonerChangedTierReadSuccess {
  summonerId: FavoriteSummonerChangedTierReadSuccessData[];
}
