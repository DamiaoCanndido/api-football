import { Router } from 'express';
import { GoogleAccountRepository } from '../repositories/google-account';
import { GoogleAccountUseCase } from '../use-cases';
import { GoogleAccountController } from '../controllers';

export class GoogleAccountRoutes {
  public router: Router;
  private googleAccountController: GoogleAccountController;

  constructor() {
    this.router = Router();
    const gAccountRepo = new GoogleAccountRepository();
    const gAccountUseCase = new GoogleAccountUseCase(gAccountRepo);
    this.googleAccountController = new GoogleAccountController(gAccountUseCase);
    this.initRoutes();
  }

  initRoutes() {
    this.router.post(
      '/google',
      this.googleAccountController.signin.bind(this.googleAccountController)
    );
  }
}
