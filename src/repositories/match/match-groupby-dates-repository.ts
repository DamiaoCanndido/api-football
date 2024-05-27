import { prisma } from '../../infra';
import { MatchGroupByDatesInterface } from '../../interfaces/match';
import { MatchOutput, MatchQueries } from '../../entities';
import { HttpException } from '../../errors';

export class MatchGroupByDatesRepository implements MatchGroupByDatesInterface {
  async groupByDates({
    from,
    to,
    t,
    ft,
  }: MatchQueries): Promise<MatchOutput[]> {
    try {
      const match = await prisma.match.findMany({
        take: t ? Number(t) : undefined,
        orderBy: [{ fullTime: 'asc' }, { startDate: 'asc' }],
        where: {
          startDate: {
            gte: from ? new Date(from) : undefined,
            lte: to ? new Date(to) : undefined,
          },
          fullTime: ft === 'true' ? true : ft === 'false' ? false : undefined,
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
      return match;
    } catch (error) {
      if (error instanceof HttpException) {
        throw new HttpException(error.status, error.message);
      }
      throw new HttpException(400, 'Database error.');
    }
  }
}
