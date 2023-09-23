import { Country } from 'entities/country';
import { CountryRepository } from '../repositories/country-repository';

export class CountryUseCase implements CountryRepository {
  constructor(private countryRepository: CountryRepository) {}

  async add(country: Country) {
    const result = await this.countryRepository.add(country);
    return result;
  }
}
