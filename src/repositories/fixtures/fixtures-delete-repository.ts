import { prisma } from '../../infra';
import { FixturesOutput } from '../../entities';
import { FixturesDeleteInterface } from '../../interfaces/fixtures';
import { HttpException } from '../../errors';

export class FixturesDeleteRepository implements FixturesDeleteInterface {
  async delete(id: string): Promise<FixturesOutput> {
    try {
      const fixtures = await prisma.fixtures.findUnique({
        where: { id },
        include: { home: true, away: true, league: true },
      });
      if (!fixtures) {
        throw new HttpException(400, 'Id invalid.');
      }
      await prisma.fixtures.delete({ where: { id } });
      return fixtures;
    } catch (error) {
      if (error instanceof HttpException) {
        throw new HttpException(error.status, error.message);
      }
      throw new HttpException(400, 'Database error.');
    }
  }
}
