import { Team } from '../../entities';

export interface TeamFindoneInterface {
  findOne: (id: string) => Promise<Team>;
}
