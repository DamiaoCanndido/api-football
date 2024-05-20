import { LeagueOutput } from '../../entities';

export interface LeagueFinishInterface {
  finish: (id: number) => Promise<LeagueOutput>;
}
