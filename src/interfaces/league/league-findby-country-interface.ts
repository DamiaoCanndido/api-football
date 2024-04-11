import { LeagueOutput } from '../../entities';

export interface LeagueFindbyCountryInterface {
  findByCountry: (countryId: number) => Promise<LeagueOutput[]>;
}
