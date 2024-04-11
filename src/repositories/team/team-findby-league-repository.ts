import { prisma } from '../../infra';
import { TeamOutput } from '../../entities';
import { TeamFindByLeagueInterface } from '../../interfaces/team';
import { HttpException } from '../../errors';

export class TeamFindByLeagueRepository implements TeamFindByLeagueInterface {
  async findByLeague(leagueId: number): Promise<TeamOutput[]> {
    try {
      const league = await prisma.league.findUnique({
        where: { id: leagueId },
      });
      if (!league) {
        throw new HttpException(404, 'League id invalid.');
      }
      const teams = await prisma.team.findMany({
        where: {
          OR: [
            { home: { some: { leagueId } } },
            { away: { some: { leagueId } } },
          ],
        },
      });
      return teams;
    } catch (error) {
      if (error instanceof HttpException) {
        throw new HttpException(error.status, error.message);
      }
      throw new HttpException(400, 'Database error.');
    }
  }
}
