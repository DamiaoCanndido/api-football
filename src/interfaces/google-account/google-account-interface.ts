import { GoogleAccountInput, GoogleAccountOutput } from '../../entities';

export interface GoogleAccountInterface {
  add: (gAccount: GoogleAccountInput) => Promise<GoogleAccountOutput>;
}
