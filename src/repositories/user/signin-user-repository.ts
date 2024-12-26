import { prisma } from '../../infra';
import * as argon from 'argon2';
import jwt from 'jsonwebtoken';
import { HttpException } from '../../errors';
import { SigninUserInterface } from '../../interfaces/user';
import { SigninUserInput, SigninUserOutput } from '../../entities/user';

export class SigninUserRepository implements SigninUserInterface {
  async signin({
    email,
    password,
  }: SigninUserInput): Promise<SigninUserOutput> {
    try {
      const userExists = await prisma.user.findUnique({
        where: {
          email,
        },
      });

      if (!userExists) {
        throw new HttpException(400, 'User already exists.');
      }

      const checkPassword = await argon.verify(userExists.password, password);

      if (!checkPassword) {
        throw new HttpException(401, 'Wrong password.');
      }

      const token = jwt.sign({ id: userExists.id }, process.env.JWT_SECRET!, {
        expiresIn: process.env.JWT_EXPIRES_IN,
      });

      return {
        token,
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw new HttpException(error.status, error.message);
      }
      throw new HttpException(400, 'Database error.');
    }
  }
}
