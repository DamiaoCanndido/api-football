import { HttpException } from '../errors';

export type TeamType = 'club' | 'selection' | 'amateur';

export interface TeamInput {
  name: string;
  code: string;
  type: TeamType;
  logo: string;
}

export interface TeamOutput {
  id: number;
  name: string;
  code: string;
  type: TeamType;
  logo: string;
}

export interface TeamUpdate {
  name?: string;
  code?: string;
  type?: TeamType;
  logo?: string;
}

export class Team {
  constructor(private readonly input: TeamInput) {
    if (!this.input.name || this.input.name.length < 3) {
      throw new HttpException(400, 'Name is incorrect.');
    }
    if (!this.input.code || this.input.code.length !== 3) {
      throw new HttpException(400, 'Code is incorrect.');
    }
    if (
      this.input.type === 'club' ||
      this.input.type === 'amateur' ||
      this.input.type === 'selection'
    ) {
    } else {
      throw new HttpException(400, 'type is incorrect.');
    }
    if (!this.input.logo || this.input.logo.length < 3) {
      throw new HttpException(400, 'Logo is incorrect.');
    }
  }
}
