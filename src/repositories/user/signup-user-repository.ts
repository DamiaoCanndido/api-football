import { prisma } from '../../infra';
import * as argon from 'argon2';
import { HttpException } from '../../errors';
import { SignupUserInterface } from '../../interfaces/user';
import { SignupUserInput, SignupUserOutput } from '../../entities/user';

export class SignupUserRepository implements SignupUserInterface {
  async signup({
    username,
    email,
    password,
  }: SignupUserInput): Promise<SignupUserOutput> {
    try {
      const userExists = await prisma.user.findUnique({
        where: {
          email,
        },
      });

      if (userExists) {
        throw new HttpException(400, 'User already exists.');
      }

      const hash = await argon.hash(password);
      const newUser = await prisma.user.create({
        data: {
          username,
          email,
          password: hash,
        },
      });
      return {
        username: newUser.username,
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw new HttpException(error.status, error.message);
      }
      throw new HttpException(400, 'Database error.');
    }
  }
}
