import { League, LeagueQueries } from '../entities';
import {
  LeagueAddInterface,
  LeagueSearchInterface,
  LeagueFindoneInterface,
} from '../interfaces/league';

export class LeagueUseCase
  implements LeagueAddInterface, LeagueSearchInterface, LeagueFindoneInterface
{
  constructor(
    private addRepo: LeagueAddInterface,
    private searchRepo: LeagueSearchInterface,
    private findoneRepo: LeagueFindoneInterface
  ) {}

  async add(league: League) {
    const result = await this.addRepo.add(league);
    return result;
  }

  async search(league: LeagueQueries) {
    const result = await this.searchRepo.search(league);
    return result;
  }

  async findOne(id: string) {
    const result = await this.findoneRepo.findOne(id);
    return result;
  }
}
