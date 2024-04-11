import { TeamUpdate, TeamOutput } from '../../entities';

export interface TeamUpdateInterface {
  update: (id: number, team: TeamUpdate) => Promise<TeamOutput>;
}
