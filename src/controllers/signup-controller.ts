import { NextFunction, Request, Response } from 'express';
import { SignupUseCase } from '../use-cases';
import { SignupUserInput, SignupValidation } from '../entities';

export class SignupController {
  constructor(private signupUseCase: SignupUseCase) {}

  // POST: /signup
  async signup(req: Request, res: Response, next: NextFunction) {
    const param: SignupUserInput = req.body;
    try {
      new SignupValidation(param);
      const user = await this.signupUseCase.signup(param);
      return res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  }
}
