type leagueType = 'LEAGUE' | 'CUP';

export class League {
  constructor(
    public name: string,
    public type: leagueType,
    public logo: string,
    public season: string,
    public numberOfRounds: number,
    public rounds: string[],
    public countryId?: string | null
  ) {
    if (this.countryId === undefined) {
      this.countryId = null;
    }
    this.rounds = Array.from(
      { length: this.numberOfRounds },
      (_, index) => 'Round ' + (index + 1).toString()
    );
  }
}
