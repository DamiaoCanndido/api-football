import { Team } from '../../entities';

export interface TeamFindByLeagueInterface {
  findByLeague: (leagueId: string) => Promise<Team[]>;
}
