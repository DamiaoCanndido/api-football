import { prisma } from '../infra';
import { Country } from '../entities';

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
