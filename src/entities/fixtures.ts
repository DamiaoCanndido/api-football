import { HttpException } from '../errors';
import { Team } from './team';

type League = {
  name: string;
};

export class FixturesInput {
  constructor(
    public startDate: string,
    public homeId: string,
    public awayId: string,
    public leagueId?: string | null,
    public round?: number | null
  ) {
    if (!this.startDate || this.startDate === '') {
      throw new HttpException(400, 'Start date is incorrect.');
    }
    if (!this.homeId || this.homeId === '') {
      throw new HttpException(400, 'Home team is incorrect.');
    }
    if (!this.homeId || this.homeId === '') {
      throw new HttpException(400, 'Home team is incorrect.');
    }
    if (!this.awayId || this.awayId === '') {
      throw new HttpException(400, 'Away team is incorrect.');
    }
    if (this.leagueId === undefined) {
      this.leagueId = null;
      this.round = null;
    }
    if (this.leagueId) {
      if (!this.round || this.round <= 0) {
        throw new HttpException(400, 'Rounds is incorrect.');
      }
    }
  }
}

export class FixturesOutput {
  constructor(
    public id: string,
    public startDate: Date,
    public home: Team,
    public away: Team,
    public leagueId?: string | null,
    public round?: string | null,
    public league?: League | null
  ) {}
}
