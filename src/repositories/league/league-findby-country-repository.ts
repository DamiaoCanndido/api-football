import { prisma } from '../../infra';
import { LeagueOutput } from '../../entities';
import { LeagueFindbyCountryInterface } from '../../interfaces/league';
import { HttpException } from '../../errors';

export class LeagueFindbyCountryRepository
  implements LeagueFindbyCountryInterface
{
  async findByCountry(countryId: string): Promise<LeagueOutput[]> {
    try {
      const country = await prisma.team.findUnique({
        where: {
          id: countryId,
        },
      });
      if (!country) {
        throw new HttpException(400, 'Country id invalid.');
      }
      if (country.type !== 'selection') {
        throw new HttpException(400, 'This is not a country.');
      }
      const leagues = await prisma.league.findMany({
        where: {
          country: {
            id: {
              equals: countryId,
            },
          },
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
