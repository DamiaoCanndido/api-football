import { prisma } from '../../infra';
import { Team } from '../../entities';
import { TeamFindByLeagueInterface } from '../../interfaces/team';
import { HttpException } from '../../errors';

export class TeamFindByLeagueRepository implements TeamFindByLeagueInterface {
  async findByLeague(leagueId: string): Promise<Team[]> {
    try {
      const teams = await prisma.team.findMany({
        where: {
          League: {
            some: {
              id: leagueId,
            },
          },
        },
      });
      if (teams.length < 1) {
        throw new HttpException(404, 'League id invalid.');
      }
      return teams;
    } catch (error) {
      if (error instanceof HttpException) {
        throw new HttpException(error.status, error.message);
      }
      throw new HttpException(400, 'Database error.');
    }
  }
}
