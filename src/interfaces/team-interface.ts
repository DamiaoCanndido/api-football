import { Team, TeamQueries } from '../entities';

export interface TeamInterface {
  add: (team: Team) => Promise<Team>;
  search: (team: TeamQueries) => Promise<Team[]>;
  findOne: (id: string) => Promise<Team>;
}
