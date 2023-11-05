import { LeagueOutput } from '../../entities';

export interface LeagueFindbyCountryInterface {
  findByCountry: (countryId: string) => Promise<LeagueOutput[]>;
}
