import {
  FixturesAddInterface,
  FixturesFindByLeagueInterface,
} from '../interfaces/fixtures';
import { FixturesInput, FixturesQueries } from '../entities';

export class FixturesUseCase
  implements FixturesAddInterface, FixturesFindByLeagueInterface
{
  constructor(
    private addFxRepo: FixturesAddInterface,
    private findByLeagueRepo: FixturesFindByLeagueInterface
  ) {}
  async add(fixture: FixturesInput) {
    const result = await this.addFxRepo.add(fixture);
    return result;
  }

  async findByLeague(fxQuery: FixturesQueries) {
    const result = await this.findByLeagueRepo.findByLeague(fxQuery);
    return result;
  }
}
