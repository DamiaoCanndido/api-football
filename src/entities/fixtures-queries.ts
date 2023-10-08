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
    if (this.homePenalty === undefined || this.awayPenalty === undefined) {
      this.homePenalty = null;
      this.awayPenalty = null;
    }
  }
}
