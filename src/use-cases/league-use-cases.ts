import { League, LeagueQueries } from '../entities';
import {
  LeagueAddInterface,
  LeagueSearchInterface,
} from '../interfaces/league';

export class LeagueUseCase
  implements LeagueAddInterface, LeagueSearchInterface
{
  constructor(
    private addRepo: LeagueAddInterface,
    private searchRepo: LeagueSearchInterface
  ) {}

  async add(league: League) {
    const result = await this.addRepo.add(league);
    return result;
  }

  async search(league: LeagueQueries) {
    const result = await this.searchRepo.search(league);
    return result;
  }
}
