import { HttpException } from '../errors';

export type leagueType = 'league' | 'cup';

export interface LeagueInput {
  name: string;
  type: leagueType;
  logo: string;
  season: string;
  numberOfRounds: number;
  rounds?: string[];
  country?: string;
}

export interface LeagueOutput {
  id: number;
  name: string;
  type: leagueType;
  logo: string;
  season: string;
  numberOfRounds: number;
  rounds: string[];
  country: string | null;
}

export class League {
  constructor(private readonly input: LeagueInput) {
    if (!this.input.name || this.input.name.length < 5) {
      throw new HttpException(400, 'Name is incorrect.');
    }
    if (this.input.type === 'cup' || this.input.type === 'league') {
    } else {
      throw new HttpException(400, 'Type is incorrect.');
    }
    if (!this.input.logo || this.input.logo.length < 3) {
      throw new HttpException(400, 'Logo is incorrect.');
    }
    if (!this.input.season || this.input.season.length < 9) {
      throw new HttpException(400, 'Season is incorrect.');
    }
    if (!this.input.numberOfRounds || this.input.numberOfRounds <= 0) {
      throw new HttpException(400, 'number of rounds is incorrect.');
    }
    if (this.input.country && this.input.country.length < 3) {
      throw new HttpException(400, 'Country is incorrect.');
    }
    this.input.rounds = Array.from(
      { length: this.input.numberOfRounds },
      (_, index) => (index + 1).toString()
    );
  }
}
