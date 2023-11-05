import { LeagueInput, LeagueOutput } from '../../entities';

export interface LeagueAddInterface {
  add: (league: LeagueInput) => Promise<LeagueOutput>;
}
