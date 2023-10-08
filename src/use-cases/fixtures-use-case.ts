import {
  FixturesAddInterface,
  FixturesFindByLeagueInterface,
  FixturesFindByTeamInterface,
} from '../interfaces/fixtures';
import { FixturesInput, FixturesQueries } from '../entities';

export class FixturesUseCase
  implements
    FixturesAddInterface,
    FixturesFindByLeagueInterface,
    FixturesFindByTeamInterface
{
  constructor(
    private addFxRepo: FixturesAddInterface,
    private findByLeagueRepo: FixturesFindByLeagueInterface,
    private findByTeamRepo: FixturesFindByTeamInterface
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
}
