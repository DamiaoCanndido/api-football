import { League } from '../entities';
import { LeagueInterface } from '../interfaces';

export class LeagueUseCase implements LeagueInterface {
  constructor(private leagueRepository: LeagueInterface) {}

  async add(league: League) {
    const result = await this.leagueRepository.add(league);
    return result;
  }
}
