import { HttpException } from '../errors';

export type leagueType = 'league' | 'cup';

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
    if (!this.name || this.name.length < 5) {
      throw new HttpException(400, 'Name is incorrect.');
    }
    if (this.type === 'cup' || this.type === 'league') {
    } else {
      throw new HttpException(400, 'Type is incorrect.');
    }
    if (!this.logo || this.logo.length < 3) {
      throw new HttpException(400, 'Logo is incorrect.');
    }
    if (!this.season || this.season.length < 9) {
      throw new HttpException(400, 'Season is incorrect.');
    }
    if (!this.numberOfRounds || this.numberOfRounds <= 0) {
      throw new HttpException(400, 'number of rounds is incorrect.');
    }
    if (this.countryId === undefined) {
      this.countryId = null;
    }
    this.rounds = Array.from(
      { length: this.numberOfRounds },
      (_, index) => 'Round ' + (index + 1).toString()
    );
  }
}
