import { TeamInput, TeamQueries, TeamUpdate } from '../entities';
import {
  TeamAddInterface,
  TeamSearchInterface,
  TeamFindoneInterface,
  TeamFindByLeagueInterface,
  TeamUpdateInterface,
} from '../interfaces/team';

export class TeamUseCase
  implements
    TeamAddInterface,
    TeamSearchInterface,
    TeamFindoneInterface,
    TeamFindByLeagueInterface,
    TeamUpdateInterface
{
  constructor(
    private addRepo: TeamAddInterface,
    private searchRepo: TeamSearchInterface,
    private findoneRepo: TeamFindoneInterface,
    private findbyLeagueRepo: TeamFindByLeagueInterface,
    private updateRepo: TeamUpdateInterface
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

  async update (id: string, team: TeamUpdate) {
    const result = await this.updateRepo.update(id, team);
    return result;
  };
}
