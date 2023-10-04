import { League } from '../../entities';

export interface LeagueFindoneInterface {
  findOne: (id: string) => Promise<League>;
}
