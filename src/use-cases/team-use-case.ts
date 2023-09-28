import { Team } from '../entities';
import { TeamRepository } from '../interfaces';

export class TeamUseCase implements TeamRepository {
  constructor(private teamRepository: TeamRepository) {}

  async add(team: Team) {
    const result = await this.teamRepository.add(team);
    return result;
  }
}
