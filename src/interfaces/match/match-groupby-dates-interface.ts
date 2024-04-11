import { MatchOutput } from '../../entities';

export interface MatchGroupByDatesInterface {
  groupByDates: () => Promise<MatchOutput[]>;
}
