import { HttpException } from '../errors';

export interface GoogleAccountInput {
  accessToken: string;
}

export interface GoogleAccountOutput {
  id: string;
  googleId: string;
  name: string;
  email: string;
  picture: string;
}

export class GoogleAccount {
  constructor(private readonly input: GoogleAccountInput) {
    if (!this.input.accessToken || this.input.accessToken === '') {
      throw new HttpException(400, 'Access token is invalid.');
    }
  }
}
