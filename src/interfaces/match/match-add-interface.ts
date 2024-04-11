import { MatchInput, MatchOutput } from '../../entities';

export interface MatchAddInterface {
  add: (mtInput: MatchInput) => Promise<MatchOutput>;
}
