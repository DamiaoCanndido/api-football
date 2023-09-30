import { Team, TeamQueries } from '../entities';

export interface TeamRepository {
  add: (team: Team) => Promise<Team>;
  search: (team: TeamQueries) => Promise<Team[]>;
}
