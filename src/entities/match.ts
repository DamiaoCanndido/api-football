import { HttpException } from '../errors';

type Guess = {
  home: number;
  away: number;
} | null;

type Player = {
  id: string;
  name: string;
  picture: string | null;
  points: number;
  guess: Guess;
  isAlive: boolean;
};

export interface MatchInput {
  players: string[];
  fixturesId: string;
}

export interface MatchOutput {
  id: string;
  players: Player[];
  winners: Player[];
  drawers: Player[];
  losers: Player[];
  fixturesId: string;
}

export class Match {
  constructor(private readonly match: MatchInput) {
    if (this.match.fixturesId == '' || !this.match.fixturesId) {
      throw new HttpException(400, 'Fixtures id is missing.');
    }
    if (this.match.players.length < 2) {
      throw new HttpException(400, 'Not enough players.');
    }
  }
}
