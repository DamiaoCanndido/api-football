import { MatchOutput } from '../../entities';

export interface MatchDeleteInterface {
  delete: (id: number) => Promise<MatchOutput>;
}
