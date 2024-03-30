import { LeagueOutput } from '../../entities';

export interface LeagueDeleteInterface {
  delete: (id: string) => Promise<LeagueOutput>;
}
