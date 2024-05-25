import {
  MatchAddInterface,
  MatchDeleteInterface,
  MatchFindByLeagueInterface,
  MatchFindByTeamInterface,
  MatchFindbyIdInterface,
  MatchGroupByDatesInterface,
  MatchRescheduledInterface,
  MatchUpdateScoresInterface,
} from '../interfaces/match';
import { MatchInput, MatchQueries, MatchScores } from '../entities';

export class MatchUseCase
  implements
    MatchAddInterface,
    MatchFindByLeagueInterface,
    MatchFindByTeamInterface,
    MatchUpdateScoresInterface,
    MatchGroupByDatesInterface,
    MatchDeleteInterface,
    MatchRescheduledInterface,
    MatchFindbyIdInterface
{
  constructor(
    private addFxRepo: MatchAddInterface,
    private findByLeagueRepo: MatchFindByLeagueInterface,
    private findByTeamRepo: MatchFindByTeamInterface,
    private updateScoresRepo: MatchUpdateScoresInterface,
    private groupByDateRepo: MatchGroupByDatesInterface,
    private deleteRepo: MatchDeleteInterface,
    private rescheduledRepo: MatchRescheduledInterface,
    private findByIdRepo: MatchFindbyIdInterface
  ) {}

  async add(match: MatchInput) {
    const result = await this.addFxRepo.add(match);
    return result;
  }

  async findByLeague(mtQuery: MatchQueries) {
    const result = await this.findByLeagueRepo.findByLeague(mtQuery);
    return result;
  }

  async findByTeam(mtQuery: MatchQueries) {
    const result = await this.findByTeamRepo.findByTeam(mtQuery);
    return result;
  }

  async updateScores(mtUpdateScores: MatchScores) {
    const result = await this.updateScoresRepo.updateScores(mtUpdateScores);
    return result;
  }

  async groupByDates(mtQuery: MatchQueries) {
    const result = await this.groupByDateRepo.groupByDates(mtQuery);
    return result;
  }

  async delete(id: number) {
    const result = await this.deleteRepo.delete(id);
    return result;
  }

  async reschedule(id: number, startDate: string) {
    const result = await this.rescheduledRepo.reschedule(id, startDate);
    return result;
  }

  async findbyId(id: number) {
    const result = await this.findByIdRepo.findbyId(id);
    return result;
  }
}
