import { HttpException } from '../errors';

export class Team {
  constructor(
    public name: string,
    public code: string,
    public isCountry: boolean,
    public logo: string
  ) {
    if (!this.name || this.name.length < 3) {
      throw new HttpException(400, 'Name is incorrect.');
    }
    if (!this.code || this.code.length !== 3) {
      throw new HttpException(400, 'Code is incorrect.');
    }
    if (typeof this.isCountry !== 'boolean') {
      throw new HttpException(400, 'isCountry is incorrect.');
    }
    if (!this.logo || this.logo.length < 3) {
      throw new HttpException(400, 'Logo is incorrect.');
    }
  }
}
