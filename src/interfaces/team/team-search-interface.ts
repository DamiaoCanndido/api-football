import { Team, TeamQueries } from '../../entities';

export interface TeamSearchInterface {
  search: (team: TeamQueries) => Promise<Team[]>;
}
