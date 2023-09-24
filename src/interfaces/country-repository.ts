import { Country } from '../entities';

export interface CountryRepository {
  add: (country: Country) => Promise<Country>;
}
