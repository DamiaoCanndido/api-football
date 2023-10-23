import { prisma } from '../../infra';
import { FixturesFindByLeagueInterface } from '../../interfaces/fixtures';
import { FixturesQueries, FixturesOutput } from '../../entities';
import { HttpException } from '../../errors';

export class FixturesFindByLeagueRepository
  implements FixturesFindByLeagueInterface
{
  async findByLeague({
    leagueId,
    round,
  }: FixturesQueries): Promise<FixturesOutput[]> {
    try {
      const league = await prisma.league.findUnique({
        where: {
          id: leagueId,
        },
      });
      if (!league) {
        throw new HttpException(404, 'league id not valid.');
      }
      const fixtures = await prisma.fixtures.findMany({
        where: {
          leagueId,
          round: {
            contains: round,
          },
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
        orderBy: [{ fullTime: 'asc' }, { startDate: 'asc' }],
      });

      return fixtures;
    } catch (error) {
      if (error instanceof HttpException) {
        throw new HttpException(error.status, error.message);
      }
      throw new HttpException(400, 'Database error.');
    }
  }
}
