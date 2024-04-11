import { LeagueOutput } from '../../entities';

export interface LeagueFindoneInterface {
  findOne: (id: number) => Promise<LeagueOutput>;
}
