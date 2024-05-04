import { prisma } from '../../infra';
import { LeagueOutput } from '../../entities';
import { LeagueFindbyCountryInterface } from '../../interfaces/league';
import { HttpException } from '../../errors';

export class LeagueFindbyCountryRepository
  implements LeagueFindbyCountryInterface
{
  async findByCountry(country: string): Promise<LeagueOutput[]> {
    try {
      const leagues = await prisma.league.findMany({
        where: {
          country,
          finished: false,
        },
      });
      return leagues;
    } catch (error) {
      if (error instanceof HttpException) {
        throw new HttpException(error.status, error.message);
      }
      throw new HttpException(400, 'Database error.');
    }
  }
}
