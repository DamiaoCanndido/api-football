import { prisma } from '../../infra';
import { LeagueOutput } from '../../entities';
import { LeagueDeleteInterface } from '../../interfaces/league';
import { HttpException } from '../../errors';

export class LeagueDeleteRepository implements LeagueDeleteInterface {
  async delete(id: string): Promise<LeagueOutput> {
    try {
      const league = await prisma.league.findUnique({
        where: {
          id,
        },
      });
      if (!league) {
        throw new HttpException(400, 'Id invalid.');
      }
      await prisma.league.delete({ where: { id } });
      return league;
    } catch (error) {
      if (error instanceof HttpException) {
        throw new HttpException(error.status, error.message);
      }
      throw new HttpException(400, 'Database error.');
    }
  }
}
