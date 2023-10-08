import { FixturesScores, FixturesOutput } from '../../entities';

export interface FixturesUpdateScoresInterface {
  updateScores: (fxScores: FixturesScores) => Promise<FixturesOutput>;
}
