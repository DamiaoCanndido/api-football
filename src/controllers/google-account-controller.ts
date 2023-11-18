import { GoogleAccount, GoogleAccountInput } from 'entities';
import { Request, Response, NextFunction } from 'express';
import { GoogleAccountUseCase } from 'use-cases';

export class GoogleAccountController {
  constructor(private gAccountUseCase: GoogleAccountUseCase) {}
  async signin(req: Request, res: Response, next: NextFunction) {
    const params: GoogleAccountInput = req.body;
    try {
      new GoogleAccount(params);
      const account = await this.gAccountUseCase.signin(params);
      return res.status(201).json(account);
    } catch (error) {
      next(error);
    }
  }
}
