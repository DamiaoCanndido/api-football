import { TeamInput, TeamQueries, TeamUpdate } from '../entities';
import {
  TeamAddInterface,
  TeamSearchInterface,
  TeamFindoneInterface,
  TeamFindByLeagueInterface,
  TeamUpdateInterface,
  TeamDeleteInterface,
} from '../interfaces/team';

export class TeamUseCase
  implements
    TeamAddInterface,
    TeamSearchInterface,
    TeamFindoneInterface,
    TeamFindByLeagueInterface,
    TeamUpdateInterface,
    TeamDeleteInterface
{
  constructor(
    private addRepo: TeamAddInterface,
    private searchRepo: TeamSearchInterface,
    private findoneRepo: TeamFindoneInterface,
    private findbyLeagueRepo: TeamFindByLeagueInterface,
    private updateRepo: TeamUpdateInterface,
    private deleteRepo: TeamDeleteInterface
  ) {}

  async add(team: TeamInput) {
    const result = await this.addRepo.add(team);
    return result;
  }

  async search(team: TeamQueries) {
    const results = await this.searchRepo.search(team);
    return results;
  }

  async findOne(id: number) {
    const results = await this.findoneRepo.findOne(id);
    return results;
  }

  async findByLeague(leagueId: number) {
    const result = await this.findbyLeagueRepo.findByLeague(leagueId);
    return result;
  }

  async update(id: number, team: TeamUpdate) {
    const result = await this.updateRepo.update(id, team);
    return result;
  }

  async delete(id: number) {
    const results = await this.deleteRepo.delete(id);
    return results;
  }
}
