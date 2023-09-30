import { Country, CountryQueries } from '../entities';
import { CountryInterface } from '../interfaces';

export class CountryUseCase implements CountryInterface {
  constructor(private countryRepository: CountryInterface) {}

  async add(country: Country) {
    const result = await this.countryRepository.add(country);
    return result;
  }

  async search(country: CountryQueries) {
    const results = await this.countryRepository.search(country);
    return results;
  }
}
