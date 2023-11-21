import { MatchInput, MatchOutput } from '../../entities/match';

export interface MatchInterface {
  add: (match: MatchInput) => Promise<MatchOutput>;
}
