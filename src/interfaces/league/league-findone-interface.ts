import { LeagueOutput } from '../../entities';

export interface LeagueFindoneInterface {
  findOne: (id: string) => Promise<LeagueOutput>;
}
