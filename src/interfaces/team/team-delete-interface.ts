import { TeamOutput } from '../../entities';

export interface TeamDeleteInterface {
  delete: (id: number) => Promise<TeamOutput>;
}
