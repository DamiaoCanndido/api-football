import { Team } from '../../entities/team';

export interface TeamAddInterface {
  add: (team: Team) => Promise<Team>;
}
