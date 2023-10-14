import { HttpException } from '../errors';

export class FixturesQueries {
  constructor(
    public leagueId?: string,
    public teamId?: string,
    public round?: string
  ) {}
}

export class FixturesScores {
  constructor(
    public id?: string,
    public homeScore?: number,
    public awayScore?: number,
    public homePenalty?: number | null,
    public awayPenalty?: number | null
  ) {
    if (!this.id || this.id === '') {
      throw new HttpException(400, 'id not valid.');
    }
    if (!this.homeScore || this.homeScore < 0) {
      throw new HttpException(400, 'Home score not valid.');
    }
    if (!this.awayScore || this.awayScore < 0) {
      throw new HttpException(400, 'Away score not valid.');
    }
    if (this.homePenalty === undefined || this.awayPenalty === undefined) {
      this.homePenalty = null;
      this.awayPenalty = null;
    }
  }
}
