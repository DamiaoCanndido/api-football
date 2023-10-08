import { FixturesQueries, FixturesOutput } from '../../entities';

export interface FixturesFindByTeamInterface {
  findByTeam: (fxQuery: FixturesQueries) => Promise<FixturesOutput[]>;
}
