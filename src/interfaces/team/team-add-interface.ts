import { TeamInput, TeamOutput } from '../../entities';

export interface TeamAddInterface {
  add: (team: TeamInput) => Promise<TeamOutput>;
}
