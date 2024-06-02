import { MatchOutput } from '../../entities';

export interface MatchFindbyMultipleIdsInterface {
  findbyIds: (ids: number[]) => Promise<MatchOutput[]>;
}
