import { Country } from '../entities/country';

export interface CountryRepository {
  add: (country: Country) => Promise<Country>;
}
