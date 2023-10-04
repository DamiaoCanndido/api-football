import { League, LeagueQueries } from '../../entities';

export interface LeagueSearchInterface {
  search: (league: LeagueQueries) => Promise<League[]>;
}
