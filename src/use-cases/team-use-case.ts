import { TeamInput, TeamQueries } from '../entities';
import {
  TeamAddInterface,
  TeamSearchInterface,
  TeamFindoneInterface,
  TeamFindByLeagueInterface,
} from '../interfaces/team';

export class TeamUseCase
  implements
    TeamAddInterface,
    TeamSearchInterface,
    TeamFindoneInterface,
    TeamFindByLeagueInterface
{
  constructor(
    private addRepo: TeamAddInterface,
    private searchRepo: TeamSearchInterface,
    private findoneRepo: TeamFindoneInterface,
    private findbyLeagueRepo: TeamFindByLeagueInterface
  ) {}

  async add(team: TeamInput) {
    const result = await this.addRepo.add(team);
    return result;
  }

  async search(team: TeamQueries) {
    const results = await this.searchRepo.search(team);
    return results;
  }

  async findOne(id: string) {
    const results = await this.findoneRepo.findOne(id);
    return results;
  }

  async findByLeague(leagueId: string) {
    const result = await this.findbyLeagueRepo.findByLeague(leagueId);
    return result;
  }
}
