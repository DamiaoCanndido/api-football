import { Country, CountryQueries } from '../entities';
import { CountryRepository } from '../interfaces';

export class CountryUseCase implements CountryRepository {
  constructor(private countryRepository: CountryRepository) {}
  async search(country: CountryQueries) {
    const results = await this.countryRepository.search(country);
    return results;
  }

  async add(country: Country) {
    const result = await this.countryRepository.add(country);
    return result;
  }
}
