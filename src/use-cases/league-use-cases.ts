import { League } from '../entities';
import { LeagueAddInterface } from '../interfaces/league';

export class LeagueUseCase implements LeagueAddInterface {
  constructor(private addRepo: LeagueAddInterface) {}

  async add(league: League) {
    const result = await this.addRepo.add(league);
    return result;
  }
}
