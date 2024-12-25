import { SignupUserInput, SignupUserOutput } from '../../entities/user';

export interface SignupUserInterface {
  signup: (user: SignupUserInput) => Promise<SignupUserOutput>;
}
