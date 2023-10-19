import { HttpException } from '../errors';

export type TeamType = 'club' | 'selection' | 'amateur';

export class Team {
  constructor(
    public name: string,
    public code: string,
    public type: TeamType,
    public logo: string
  ) {
    if (!this.name || this.name.length < 3) {
      throw new HttpException(400, 'Name is incorrect.');
    }
    if (!this.code || this.code.length !== 3) {
      throw new HttpException(400, 'Code is incorrect.');
    }
    if (
      this.type === 'club' ||
      this.type === 'amateur' ||
      this.type === 'selection'
    ) {
    } else {
      throw new HttpException(400, 'type is incorrect.');
    }
    if (!this.logo || this.logo.length < 3) {
      throw new HttpException(400, 'Logo is incorrect.');
    }
  }
}
