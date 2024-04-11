import { prisma } from '../../infra';
import { MatchOutput } from '../../entities';
import { MatchRescheduledInterface } from '../../interfaces/match';
import { HttpException } from '../../errors';
import { dateNow } from 'helpers';

export class MatchRescheduledRepository implements MatchRescheduledInterface {
  async reschedule(id: number, startDate: string): Promise<MatchOutput> {
    try {
      const match = await prisma.match.findUnique({ where: { id } });
      if (!match) {
        throw new HttpException(404, 'Match id not found.');
      }
      if (new Date(startDate).getTime() < dateNow) {
        throw new HttpException(400, 'start date not valid.');
      }
      const fixturesRescheduled = await prisma.match.update({
        where: {
          id,
        },
        data: {
          startDate,
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

      return fixturesRescheduled;
    } catch (error) {
      if (error instanceof HttpException) {
        throw new HttpException(error.status, error.message);
      }
      throw new HttpException(400, 'Database error.');
    }
  }
}
