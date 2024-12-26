import { NextFunction, Request, Response } from 'express';
import { SigninUseCase } from '../use-cases';
import { SigninUserInput, SigninValidation } from '../entities';

export class SigninController {
  constructor(private signinUseCase: SigninUseCase) {}

  // POST: /signin
  async signin(req: Request, res: Response, next: NextFunction) {
    const param: SigninUserInput = req.body;
    try {
      const options = {
        maxAge: Number(process.env.JWT_EXPIRES_IN!),
        httpOnly: true,
        expires: new Date(Date.now() + process.env.JWT_EXPIRES_IN!),
      };
      new SigninValidation(param);
      const user = await this.signinUseCase.signin(param);
      return res.cookie('token', user.token, options).status(201).json(user);
    } catch (error) {
      next(error);
    }
  }
}
