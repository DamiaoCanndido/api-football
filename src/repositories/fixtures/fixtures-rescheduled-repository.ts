import { prisma } from '../../infra';
import { FixturesOutput } from '../../entities';
import { FixturesRescheduledInterface } from '../../interfaces/fixtures';
import { HttpException } from '../../errors';
import { dateNow } from 'helpers';

export class FixturesRescheduledRepository
  implements FixturesRescheduledInterface
{
  async reschedule(id: string, startDate: string): Promise<FixturesOutput> {
    try {
      const fixtures = await prisma.fixtures.findUnique({ where: { id } });
      if (!fixtures) {
        throw new HttpException(404, 'Fixtures id not found.');
      }
      if (new Date(startDate).getTime() < dateNow) {
        throw new HttpException(400, 'start date not valid.');
      }
      const fixturesRescheduled = await prisma.fixtures.update({
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
