type Params = {
  name: string;
  type: leagueType;
  logo: string;
  season: string;
  numberOfRounds: number;
  rounds: string[];
  numberOfGroups: number;
  numberOfRoundsByGroup: number;
  playoffStages: number;
  countryId?: string;
  _id?: string;
};

type leagueType = 'league' | 'cup';
const playoffStagesType = [
  'Finals',
  'Semifinals',
  'Quarter-finals',
  'Round-of-16',
];

export class League {
  constructor(params: Params) {
    if (params.type === 'league') {
      params.rounds = Array.from(
        { length: params.numberOfRounds },
        (_, index) => 'Round ' + (index + 1).toString()
      );
    } else {
      params.rounds = Array.from(
        { length: params.numberOfRoundsByGroup },
        (_, index) => 'Group Stage - Round ' + (index + 1).toString()
      );
      const phases = playoffStagesType.slice(0, params.playoffStages).reverse();
      params.rounds = params.rounds.concat(phases);
    }
  }
}
