import { prisma } from '../../infra';
import { MatchFindByTeamInterface } from '../../interfaces/match';
import { MatchQueries, MatchOutput } from '../../entities';
import { HttpException } from '../../errors';

export class MatchFindByTeamRepository implements MatchFindByTeamInterface {
  async findByTeam({ teamId, from, to }: MatchQueries): Promise<MatchOutput[]> {
    try {
      const team = await prisma.team.findUnique({
        where: {
          id: teamId,
        },
      });
      if (!team) {
        throw new HttpException(404, 'team id not valid.');
      }
      const match = await prisma.match.findMany({
        where: {
          OR: [{ homeId: teamId }, { awayId: teamId }],
          startDate: {
            gte: from ? new Date(from) : undefined,
            lte: to ? new Date(to) : undefined,
          },
        },
        include: {
          home: true,
          away: true,
          league: {
            select: {
              id: true,
              name: true,
            },
          },
        },
        orderBy: [{ fullTime: 'asc' }, { startDate: 'asc' }],
      });

      return match;
    } catch (error) {
      if (error instanceof HttpException) {
        throw new HttpException(error.status, error.message);
      }
      throw new HttpException(400, 'Database error.');
    }
  }
}
