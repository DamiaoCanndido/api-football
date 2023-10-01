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
    public rounds: string[],
    public numberOfGroups: number,
    public numberOfRoundsByGroup: number,
    public playoffStages: number,
    public countryId?: string,
    public _id?: string
  ) {
    if (type === 'LEAGUE') {
      rounds = Array.from(
        { length: numberOfRounds },
        (_, index) => 'Round ' + (index + 1).toString()
      );
    } else {
      rounds = Array.from(
        { length: numberOfRoundsByGroup },
        (_, index) => 'Group Stage - Round ' + (index + 1).toString()
      );
      const phases = playoffStagesType.slice(0, playoffStages).reverse();
      rounds = rounds.concat(phases);
    }
  }
}
