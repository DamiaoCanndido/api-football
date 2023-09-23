import { prisma } from '../infra/database';
import { Country } from '../entities/country';

export class CountryRepositoryDB {
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
}
