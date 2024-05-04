import { LeagueOutput } from '../../entities';

export interface LeagueFindbyCountryInterface {
  findByCountry: (country: string) => Promise<LeagueOutput[]>;
}
