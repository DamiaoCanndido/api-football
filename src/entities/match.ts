import { HttpException } from '../errors';
import { TeamOutput } from './team';

type League = {
  name: string;
};

export interface MatchInput {
  startDate: string;
  homeId: number;
  awayId: number;
  leagueId?: number;
  round?: number;
}

export interface MatchOutput {
  id: number;
  startDate: Date;
  home: TeamOutput;
  away: TeamOutput;
  leagueId: number | null;
  round: string | null;
  league: League | null;
}

export class Match {
  constructor(private readonly input: MatchInput) {
    if (!this.input.startDate || this.input.startDate.length < 10) {
      throw new HttpException(400, 'Start date is incorrect.');
    }
    if (!this.input.homeId || this.input.homeId === 0) {
      throw new HttpException(400, 'Home team is incorrect.');
    }
    if (!this.input.homeId || this.input.homeId === 0) {
      throw new HttpException(400, 'Home team is incorrect.');
    }
    if (!this.input.awayId || this.input.awayId === 0) {
      throw new HttpException(400, 'Away team is incorrect.');
    }
    if (this.input.round && this.input.round <= 0) {
      throw new HttpException(400, 'Rounds is incorrect.');
    }
  }
}
