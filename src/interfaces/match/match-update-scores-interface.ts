import { MatchScores, MatchOutput } from '../../entities';

export interface MatchUpdateScoresInterface {
  updateScores: (mtScores: MatchScores) => Promise<MatchOutput>;
}
