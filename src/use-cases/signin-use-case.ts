import { SigninUserRepository } from '../repositories/user';
import { SigninUserInterface } from '../interfaces/user';
import { SigninUserInput } from '../entities';

export class SigninUseCase implements SigninUserInterface {
  constructor(private signinRepo: SigninUserRepository) {}

  async signin(signin: SigninUserInput) {
    const result = await this.signinRepo.signin(signin);
    return { token: result.token };
  }
}
