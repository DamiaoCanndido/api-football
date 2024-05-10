import { LeagueInput, LeagueQueries } from '../entities';
import {
  LeagueAddInterface,
  LeagueSearchInterface,
  LeagueFindoneInterface,
  LeagueDeleteInterface,
} from '../interfaces/league';

export class LeagueUseCase
  implements
    LeagueAddInterface,
    LeagueSearchInterface,
    LeagueFindoneInterface,
    LeagueDeleteInterface
{
  constructor(
    private addRepo: LeagueAddInterface,
    private searchRepo: LeagueSearchInterface,
    private findoneRepo: LeagueFindoneInterface,
    private deleteRepo: LeagueDeleteInterface
  ) {}

  async add(league: LeagueInput) {
    const result = await this.addRepo.add(league);
    return result;
  }

  async search(league: LeagueQueries) {
    const result = await this.searchRepo.search(league);
    return result;
  }

  async findOne(id: number) {
    const result = await this.findoneRepo.findOne(id);
    return result;
  }

  async delete(id: number) {
    const result = await this.deleteRepo.delete(id);
    return result;
  }
}
