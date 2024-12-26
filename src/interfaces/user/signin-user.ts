import { SigninUserInput, SigninUserOutput } from '../../entities/user';

export interface SigninUserInterface {
  signin: (user: SigninUserInput) => Promise<SigninUserOutput>;
}
