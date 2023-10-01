import { Team, TeamQueries } from '../entities';
import { TeamInterface } from '../interfaces';

export class TeamUseCase implements TeamInterface {
  constructor(private teamRepository: TeamInterface) {}

  async add(team: Team) {
    const result = await this.teamRepository.add(team);
    return result;
  }

  async search(team: TeamQueries) {
    const results = await this.teamRepository.search(team);
    return results;
  }

  async findOne(id: string) {
    const results = await this.teamRepository.findOne(id);
    return results;
  }
}
