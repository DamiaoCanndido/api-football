import { prisma } from '../../infra';
import { FixturesScores, FixturesOutput } from '../../entities';
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
      const fixtures = await prisma.fixtures.findUnique({ where: { id } });
      if (!fixtures) {
        throw new HttpException(404, 'Fixtures id not found.');
      }
      const fixturesCreated = await prisma.fixtures.update({
        where: {
          id,
        },
        data: {
          homeScore,
          awayScore,
          homePenalty,
          awayPenalty,
          fullTime: true,
        },
        include: {
          home: true,
          away: true,
          league: {
            select: {
              name: true,
            },
          },
        },
      });

      return fixturesCreated;
    } catch (error) {
      if (error instanceof HttpException) {
        throw new HttpException(error.status, error.message);
      }
      throw new HttpException(400, 'Database error.');
    }
  }
}
