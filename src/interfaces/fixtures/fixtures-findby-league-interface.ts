import { FixturesQueries, FixturesOutput } from '../../entities';

export interface FixturesFindByLeagueInterface {
  findByLeague: (fxQuery: FixturesQueries) => Promise<FixturesOutput[]>;
}
