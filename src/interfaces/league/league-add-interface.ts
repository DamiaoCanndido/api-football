import { League } from '../../entities';

export interface LeagueAddInterface {
  add: (league: League) => Promise<League>;
}
