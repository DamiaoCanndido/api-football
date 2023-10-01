type leagueType = 'LEAGUE' | 'CUP';
const playoffStagesType = [
  'Finals',
  'Semifinals',
  'Quarter-finals',
  'Round-of-16',
];

export class League {
  constructor(
    public name: string,
    public type: leagueType,
    public logo: string,
    public season: string,
    public numberOfRounds: number,
    public rounds: string[] | null = [],
    public numberOfGroups?: number | null,
    public numberOfRoundsByGroup?: number | null,
    public playoffStages?: number | null,
    public countryId?: string | null
  ) {
    if (type === 'LEAGUE') {
      this.numberOfGroups = 0;
      this.numberOfRoundsByGroup = 0;
      this.playoffStages = 0;
      this.rounds = Array.from(
        { length: this.numberOfRounds },
        (_, index) => 'Round ' + (index + 1).toString()
      );
    } else {
      this.rounds = Array.from(
        { length: this.numberOfRoundsByGroup! },
        (_, index) => 'Group Stage - Round ' + (index + 1).toString()
      );
      const phases = playoffStagesType.slice(0, this.playoffStages!).reverse();
      this.rounds = this.rounds.concat(phases);
    }
  }
}
