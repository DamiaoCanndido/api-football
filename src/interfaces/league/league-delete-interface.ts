import { LeagueOutput } from '../../entities';

export interface LeagueDeleteInterface {
  delete: (id: number) => Promise<LeagueOutput>;
}
