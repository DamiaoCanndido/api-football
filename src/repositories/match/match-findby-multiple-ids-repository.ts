import { prisma } from '../../infra';
import { MatchOutput } from '../../entities';
import { MatchFindbyMultipleIdsInterface } from '../../interfaces/match';
import { HttpException } from '../../errors';

export class MatchFindbyMultipleIdsRepository
  implements MatchFindbyMultipleIdsInterface
{
  async findbyIds(ids: number[]): Promise<MatchOutput[]> {
    try {
      const matches = await prisma.match.findMany({
        where: { id: { in: ids } },
        orderBy: [{ fullTime: 'asc' }, { startDate: 'asc' }],
        include: { home: true, away: true, league: true },
      });
      return matches;
    } catch (error) {
      if (error instanceof HttpException) {
        throw new HttpException(error.status, error.message);
      }
      throw new HttpException(400, 'Database error.');
    }
  }
}
