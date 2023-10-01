import { Team, TeamQueries } from '../entities';
import {
  TeamAddInterface,
  TeamSearchInterface,
  TeamFindoneInterface,
} from '../interfaces/team';

export class TeamUseCase
  implements TeamAddInterface, TeamSearchInterface, TeamFindoneInterface
{
  constructor(
    private addRepo: TeamAddInterface,
    private searchRepo: TeamSearchInterface,
    private findoneRepo: TeamFindoneInterface
  ) {}

  async add(team: Team) {
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
}
