import { HttpException } from '../errors';

export class MatchQueries {
  constructor(
    public leagueId?: number,
    public teamId?: number,
    public round?: string
  ) {}
}

export class MatchScores {
  constructor(
    public id: number,
    public homeScore?: number,
    public awayScore?: number,
    public homePenalty?: number | null,
    public awayPenalty?: number | null
  ) {
    if (!this.id || this.id === 0) {
      throw new HttpException(400, 'id not valid.');
    }
    if (typeof this.homeScore === 'undefined' || this.homeScore! < 0) {
      throw new HttpException(400, 'Home score not valid.');
    }
    if (typeof this.awayScore === 'undefined' || this.awayScore! < 0) {
      throw new HttpException(400, 'Away score not valid.');
    }
    if (this.homePenalty === undefined || this.awayPenalty === undefined) {
      this.homePenalty = null;
      this.awayPenalty = null;
    }
  }
}
