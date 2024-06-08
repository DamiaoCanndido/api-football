import { TeamOutput, TeamQueries } from '../../entities';

export interface TeamSearchInterface {
  search: (team: TeamQueries) => Promise<TeamOutput[]>;
}
