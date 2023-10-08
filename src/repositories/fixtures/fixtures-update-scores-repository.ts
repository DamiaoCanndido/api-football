import { prisma } from '../../infra';
import { FixturesScores, FixturesOutput, League } from '../../entities';
import { FixturesUpdateScoresInterface } from '../../interfaces/fixtures';
import { HttpException } from '../../errors';

export class FixturesUpdateScoresRepository
  implements FixturesUpdateScoresInterface
{
  async updateScores({
    id,
    homeScore,
    awayScore,
    homePenalty,
    awayPenalty,
  }: FixturesScores): Promise<FixturesOutput> {
    try {
      const fixtures = await prisma.fixtures.update({
        where: {
          id,
        },
        data: { homeScore, awayScore, homePenalty, awayPenalty },
        include: {
          home: true,
          away: true,
        },
      });
      if (!fixtures) {
        throw new HttpException(404, 'Fixtures id not found.');
      }
      return fixtures;
    } catch (error) {
      if (error instanceof HttpException) {
        throw new HttpException(error.status, error.message);
      }
      throw new HttpException(400, 'Database error.');
    }
  }
}
