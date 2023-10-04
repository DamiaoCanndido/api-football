import { Team } from '../../entities';

export interface TeamAddInterface {
  add: (team: Team) => Promise<Team>;
}
