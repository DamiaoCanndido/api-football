import { prisma } from '../../infra';
import { MatchGroupByDatesInterface } from '../../interfaces/match';
import { MatchOutput } from '../../entities';
import { HttpException } from '../../errors';

export class MatchGroupByDatesRepository implements MatchGroupByDatesInterface {
  async groupByDates(): Promise<MatchOutput[]> {
    try {
      const match = await prisma.match.findMany({
        orderBy: [{ fullTime: 'asc' }, { startDate: 'asc' }],
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
