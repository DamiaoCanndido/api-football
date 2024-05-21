import { prisma } from '../../infra';
import { MatchFindByLeagueInterface } from '../../interfaces/match';
import { MatchQueries, MatchOutput } from '../../entities';
import { HttpException } from '../../errors';

export class MatchFindByLeagueRepository implements MatchFindByLeagueInterface {
  async findByLeague({
    leagueId,
    round,
    from,
    to,
  }: MatchQueries): Promise<MatchOutput[]> {
    try {
      const league = await prisma.league.findUnique({
        where: {
          id: leagueId,
        },
      });
      if (!league) {
        throw new HttpException(404, 'league id not valid.');
      }
      const match = await prisma.match.findMany({
        where: {
          leagueId,
          startDate: {
            gte: from ? new Date(from) : undefined,
            lte: to ? new Date(to) : undefined,
          },
          round: {
            contains: round,
            not: {
              gt: round,
              lt: round,
            },
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
