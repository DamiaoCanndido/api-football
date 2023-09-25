import { Country, CountryQueries } from '../entities';

export interface CountryRepository {
  add: (country: Country) => Promise<Country>;
  search: (country: CountryQueries) => Promise<Country[]>;
}
