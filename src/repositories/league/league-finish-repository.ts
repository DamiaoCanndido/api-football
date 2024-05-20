import { prisma } from '../../infra';
import { LeagueOutput } from '../../entities';
import { LeagueFinishInterface } from '../../interfaces/league';
import { HttpException } from '../../errors';

export class LeagueFinishRepository implements LeagueFinishInterface {
  async finish(id: number): Promise<LeagueOutput> {
    try {
      const league = await prisma.league.findUnique({
        where: {
          id,
        },
      });
      if (!league) {
        throw new HttpException(400, 'Id invalid.');
      }
      const leagueFinished = await prisma.league.update({
        where: { id },
        data: { finished: true },
      });
      return leagueFinished;
    } catch (error) {
      if (error instanceof HttpException) {
        throw new HttpException(error.status, error.message);
      }
      throw new HttpException(400, 'Database error.');
    }
  }
}
