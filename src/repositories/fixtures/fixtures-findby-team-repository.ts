import { prisma } from '../../infra';
import { FixturesFindByTeamInterface } from '../../interfaces/fixtures';
import { FixturesQueries, FixturesOutput } from '../../entities';
import { HttpException } from '../../errors';

export class FixturesFindByTeamRepository
  implements FixturesFindByTeamInterface
{
  async findByTeam({
    teamId,
    leagueId,
  }: FixturesQueries): Promise<FixturesOutput[]> {
    try {
      const team = await prisma.team.findUnique({
        where: {
          id: teamId,
        },
      });
      if (!team) {
        throw new HttpException(404, 'team id not valid.');
      }
      if (leagueId) {
        const league = await prisma.league.findUnique({
          where: {
            id: leagueId,
          },
        });
        if (!league) {
          throw new HttpException(404, 'league id not valid.');
        }
      }
      const fixtures = await prisma.fixtures.findMany({
        where: {
          OR: [{ homeId: teamId }, { awayId: teamId }],
          leagueId,
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
