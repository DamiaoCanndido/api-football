import { TeamOutput } from '../../entities';

export interface TeamFindByLeagueInterface {
  findByLeague: (leagueId: number) => Promise<TeamOutput[]>;
}
