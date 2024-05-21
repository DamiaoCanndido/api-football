import { MatchOutput, MatchQueries } from '../../entities';

export interface MatchGroupByDatesInterface {
  groupByDates: (mtQuery: MatchQueries) => Promise<MatchOutput[]>;
}
