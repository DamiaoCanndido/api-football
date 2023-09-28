import { prisma } from '../infra';
import { Country, CountryQueries } from '../entities';
import { CountryRepository } from '../interfaces';

export class CountryRepositoryDB implements CountryRepository {
  async add({ name, code, flag }: Country): Promise<Country> {
    const country = await prisma.country.create({
      data: {
        name,
        code,
        flag,
      },
    });
    return country;
  }

  async search({ code, name }: CountryQueries): Promise<Country[]> {
    const countries = await prisma.country.findMany({
      where: {
        name: {
          contains: name,
          mode: 'insensitive',
        },
        code: {
          contains: code,
          mode: 'insensitive',
        },
      },
    });
    return countries;
  }
}
