import { prisma } from '../../infra';
import { MatchOutput } from '../../entities';
import { MatchFindbyIdInterface } from '../../interfaces/match';
import { HttpException } from '../../errors';

export class MatchFindbyIdRepository implements MatchFindbyIdInterface {
  async findbyId(id: number): Promise<MatchOutput> {
    try {
      const match = await prisma.match.findUnique({
        where: { id },
        include: { home: true, away: true, league: true },
      });
      if (!match) {
        throw new HttpException(400, 'Id invalid.');
      }
      await prisma.match.findUnique({ where: { id } });
      return match;
    } catch (error) {
      if (error instanceof HttpException) {
        throw new HttpException(error.status, error.message);
      }
      throw new HttpException(400, 'Database error.');
    }
  }
}
