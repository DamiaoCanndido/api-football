import { TeamOutput } from '../../entities';

export interface TeamDeleteInterface {
  delete: (id: string) => Promise<TeamOutput>;
}
