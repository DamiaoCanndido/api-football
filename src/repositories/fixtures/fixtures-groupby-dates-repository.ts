import { prisma } from '../../infra';
import { FixturesGroupByDatesInterface } from '../../interfaces/fixtures';
import { FixturesOutput } from '../../entities';
import { HttpException } from '../../errors';

export class FixturesGroupByDatesRepository
  implements FixturesGroupByDatesInterface
{
  async groupByDates(): Promise<FixturesOutput[]> {
    try {
      const fixtures = await prisma.fixtures.findMany({
        orderBy: [{ fullTime: 'asc' }, { startDate: 'asc' }],
        include: { home: true, away: true },
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
