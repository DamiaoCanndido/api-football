export class FixturesInput {
  constructor(
    public startDate: string,
    public homeId: string,
    public awayId: string,
    public leagueId?: string | null,
    public round?: number | null
  ) {
    if (this.leagueId === undefined) {
      this.leagueId = null;
      this.round = null;
    }
  }
}

export class FixturesOutput {
  constructor(
    public startDate: Date,
    public homeId: string,
    public awayId: string,
    public leagueId?: string | null,
    public round?: string | null
  ) {}
}
