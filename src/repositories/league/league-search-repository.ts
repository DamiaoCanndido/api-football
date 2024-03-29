import { prisma } from '../../infra';
import { LeagueOutput, LeagueQueries } from '../../entities';
import { LeagueSearchInterface } from '../../interfaces/league';

export class LeagueSearchRepository implements LeagueSearchInterface {
  async search({ name }: LeagueQueries): Promise<LeagueOutput[]> {
    const leagues = await prisma.league.findMany({
      where: {
        name: { contains: name, mode: 'insensitive' },
        finished: false,
      },
      orderBy: {
        season: 'desc',
      },
    });
    return leagues;
  }
}
