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
    teamId,
  }: FixturesQueries): Promise<FixturesOutput[]> {
    try {
      const fixtures = await prisma.fixtures.findMany({
        where: {
          leagueId,
          OR: [{ homeId: teamId }, { awayId: teamId }],
          round: {
            endsWith: round,
          },
        },
        include: {
          home: true,
          away: true,
        },
      });
      if (fixtures.length === 0) {
        throw new HttpException(404, 'league id not valid.');
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
