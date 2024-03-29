import { TeamUpdate, TeamOutput } from '../../entities';

export interface TeamUpdateInterface {
  update: (id: string, team: TeamUpdate) => Promise<TeamOutput>;
}