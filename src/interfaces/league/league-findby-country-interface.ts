import { League } from '../../entities';

export interface LeagueFindbyCountryInterface {
  findByCountry: (countryId: string) => Promise<League[]>;
}
