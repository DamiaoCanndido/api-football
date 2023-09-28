import { Team } from '../entities';

export interface TeamRepository {
  add: (team: Team) => Promise<Team>;
}
