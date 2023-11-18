import { GoogleAccountInterface } from '../interfaces/google-account';
import { GoogleAccountInput } from '../entities';

export class GoogleAccountUseCase implements GoogleAccountInterface {
  constructor(private gAccountRepo: GoogleAccountInterface) {}
  async signin(accessToken: GoogleAccountInput) {
    const result = await this.gAccountRepo.signin(accessToken);
    return result;
  }
}
