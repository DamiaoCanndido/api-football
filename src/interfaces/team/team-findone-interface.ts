import { TeamOutput } from '../../entities';

export interface TeamFindoneInterface {
  findOne: (id: string) => Promise<TeamOutput>;
}
