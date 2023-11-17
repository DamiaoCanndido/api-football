import { GoogleAccountInput, GoogleAccountOutput } from '../../entities';

export interface GoogleAccountInterface {
  signin: (accessToken: GoogleAccountInput) => Promise<GoogleAccountOutput>;
}
