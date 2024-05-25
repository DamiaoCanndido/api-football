import { MatchOutput } from '../../entities';

export interface MatchFindbyIdInterface {
  findbyId: (id: number) => Promise<MatchOutput>;
}
