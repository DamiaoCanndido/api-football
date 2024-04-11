import { prisma } from '../../infra';
import { MatchOutput } from '../../entities';
import { MatchDeleteInterface } from '../../interfaces/match';
import { HttpException } from '../../errors';

export class MatchDeleteRepository implements MatchDeleteInterface {
  async delete(id: number): Promise<MatchOutput> {
    try {
      const match = await prisma.match.findUnique({
        where: { id },
        include: { home: true, away: true, league: true },
      });
      if (!match) {
        throw new HttpException(400, 'Id invalid.');
      }
      await prisma.match.delete({ where: { id } });
      return match;
    } catch (error) {
      if (error instanceof HttpException) {
        throw new HttpException(error.status, error.message);
      }
      throw new HttpException(400, 'Database error.');
    }
  }
}
