import { LeagueOutput, LeagueQueries } from '../../entities';

export interface LeagueSearchInterface {
  search: (league: LeagueQueries) => Promise<LeagueOutput[]>;
}
