import { League } from '../entities';

export interface LeagueInterface {
  add: (league: League) => Promise<League>;
}
