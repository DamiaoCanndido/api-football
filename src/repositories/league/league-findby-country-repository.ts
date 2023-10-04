import { prisma } from '../../infra';
import { League } from '../../entities';
import { LeagueFindbyCountryInterface } from '../../interfaces/league';
import { HttpException } from '../../errors';

export class LeagueFindbyCountryRepository
  implements LeagueFindbyCountryInterface
{
  async findByCountry(countryId: string): Promise<League[]> {
    try {
      const leagues = await prisma.league.findMany({
        where: {
          country: {
            id: {
              equals: countryId,
            },
          },
        },
      });
      if (leagues.length === 0) {
        throw new HttpException(400, 'Country id invalid.');
      }
      return leagues;
    } catch {
      throw new HttpException(400, 'Country id invalid.');
    }
  }
}
