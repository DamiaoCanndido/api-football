import { Country } from 'entities/country';
import { CountryRepository } from '../interfaces/country-repository';

export class CountryUseCase implements CountryRepository {
  constructor(private countryRepository: CountryRepository) {}

  async add(country: Country) {
    const result = await this.countryRepository.add(country);
    return result;
  }
}
