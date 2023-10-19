import { FixturesQueries, FixturesOutput } from '../../entities';

export interface FixturesGroupByDatesInterface {
  groupByDates: () => Promise<FixturesOutput[]>;
}
