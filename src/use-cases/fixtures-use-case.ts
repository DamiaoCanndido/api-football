import {
  FixturesAddInterface,
  FixturesFindByLeagueInterface,
  FixturesFindByTeamInterface,
  FixturesGroupByDatesInterface,
  FixturesUpdateScoresInterface,
} from '../interfaces/fixtures';
import { FixturesInput, FixturesQueries, FixturesScores } from '../entities';

export class FixturesUseCase
  implements
    FixturesAddInterface,
    FixturesFindByLeagueInterface,
    FixturesFindByTeamInterface,
    FixturesUpdateScoresInterface,
    FixturesGroupByDatesInterface
{
  constructor(
    private addFxRepo: FixturesAddInterface,
    private findByLeagueRepo: FixturesFindByLeagueInterface,
    private findByTeamRepo: FixturesFindByTeamInterface,
    private updateScoresRepo: FixturesUpdateScoresInterface,
    private groupByDateRepo: FixturesGroupByDatesInterface
  ) {}
  async add(fixture: FixturesInput) {
    const result = await this.addFxRepo.add(fixture);
    return result;
  }

  async findByLeague(fxQuery: FixturesQueries) {
    const result = await this.findByLeagueRepo.findByLeague(fxQuery);
    return result;
  }

  async findByTeam(fxQuery: FixturesQueries) {
    const result = await this.findByTeamRepo.findByTeam(fxQuery);
    return result;
  }

  async updateScores(fxUpdateScores: FixturesScores) {
    const result = await this.updateScoresRepo.updateScores(fxUpdateScores);
    return result;
  }

  async groupByDates() {
    const result = await this.groupByDateRepo.groupByDates();
    return result;
  }
}
