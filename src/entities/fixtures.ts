import { HttpException } from '../errors';
import { Team, TeamOutput } from './team';

type League = {
  name: string;
};

export interface FixturesInput {
  startDate: string;
  homeId: string;
  awayId: string;
  leagueId?: string | null;
  round?: number | null;
}

export interface FixturesOutput {
  id: string;
  startDate: Date;
  home: TeamOutput;
  away: TeamOutput;
  leagueId: string | null;
  round: string | null;
  league: League | null;
}

export class Fixtures {
  constructor(private readonly input: FixturesInput) {
    if (!this.input.startDate || this.input.startDate === '') {
      throw new HttpException(400, 'Start date is incorrect.');
    }
    if (!this.input.homeId || this.input.homeId === '') {
      throw new HttpException(400, 'Home team is incorrect.');
    }
    if (!this.input.homeId || this.input.homeId === '') {
      throw new HttpException(400, 'Home team is incorrect.');
    }
    if (!this.input.awayId || this.input.awayId === '') {
      throw new HttpException(400, 'Away team is incorrect.');
    }
    if (this.input.leagueId === undefined) {
      this.input.leagueId = null;
      this.input.round = null;
    }
    if (this.input.leagueId) {
      if (!this.input.round || this.input.round <= 0) {
        throw new HttpException(400, 'Rounds is incorrect.');
      }
    }
  }
}
