import { TeamOutput } from '../../entities';

export interface TeamFindoneInterface {
  findOne: (id: number) => Promise<TeamOutput>;
}
