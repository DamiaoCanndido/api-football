import { MatchQueries, MatchOutput } from '../../entities';

export interface MatchFindByLeagueInterface {
  findByLeague: (mtQuery: MatchQueries) => Promise<MatchOutput[]>;
}
