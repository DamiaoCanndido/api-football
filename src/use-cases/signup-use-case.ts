import { SignupUserRepository } from 'src/repositories/user';
import { SignupUserInterface } from '../interfaces/user';
import { SignupUserInput } from '../entities';
import { HttpException } from '../errors';

export class SignupUseCase implements SignupUserInterface {
  constructor(private signupRepo: SignupUserRepository) {}

  async signup(signup: SignupUserInput) {
    if (signup.password !== signup.repeatPassword) {
      throw new HttpException(400, 'Passwords do not match.');
    }
    const result = await this.signupRepo.signup(signup);
    return { username: result.username };
  }
}
