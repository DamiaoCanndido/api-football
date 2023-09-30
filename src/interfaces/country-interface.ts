import { Country, CountryQueries } from '../entities';

export interface CountryInterface {
  add: (country: Country) => Promise<Country>;
  search: (country: CountryQueries) => Promise<Country[]>;
}
