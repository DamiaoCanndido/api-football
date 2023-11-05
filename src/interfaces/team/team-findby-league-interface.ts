import { TeamOutput } from '../../entities';

export interface TeamFindByLeagueInterface {
  findByLeague: (leagueId: string) => Promise<TeamOutput[]>;
}
