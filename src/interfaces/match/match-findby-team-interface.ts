import { MatchQueries, MatchOutput } from '../../entities';

export interface MatchFindByTeamInterface {
  findByTeam: (mtQuery: MatchQueries) => Promise<MatchOutput[]>;
}
