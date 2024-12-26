import { HttpException } from '../errors';

export interface SignupUserInput {
  username: string;
  email: string;
  password: string;
  repeatPassword: string;
}

export interface SignupUserOutput {
  username: string;
}

export interface SigninUserInput {
  email: string;
  password: string;
}

export interface SigninUserOutput {
  token: string;
}

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export class SignupValidation {
  constructor(private readonly input: SignupUserInput) {
    if (!this.input.username || this.input.username.length < 3) {
      throw new HttpException(400, 'Username is incorrect.');
    }
    if (
      !this.input.email ||
      !emailRegex.test(this.input.email) ||
      this.input.email.length < 6
    ) {
      throw new HttpException(400, 'Email is incorrect.');
    }
    if (!this.input.password || this.input.password.length < 6) {
      throw new HttpException(400, 'Password is incorrect.');
    }
    if (!this.input.repeatPassword || this.input.repeatPassword.length < 6) {
      throw new HttpException(400, 'Confirm is incorrect.');
    }
  }
}

export class SigninValidation {
  constructor(private readonly input: SigninUserInput) {
    if (
      !this.input.email ||
      !emailRegex.test(this.input.email) ||
      this.input.email.length < 6
    ) {
      throw new HttpException(400, 'Email is incorrect.');
    }
    if (!this.input.password || this.input.password.length < 6) {
      throw new HttpException(400, 'Password is incorrect.');
    }
  }
}
