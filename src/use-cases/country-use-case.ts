import { Country } from '../entities';
import { CountryRepository } from '../interfaces';

export class CountryUseCase implements CountryRepository {
  constructor(private countryRepository: CountryRepository) {}

  async add(country: Country) {
    const result = await this.countryRepository.add(country);
    return result;
  }
}
