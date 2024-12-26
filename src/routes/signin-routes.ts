import { Router } from 'express';
import { SigninController } from '../controllers';
import { SigninUseCase } from '../use-cases';
import { SigninUserRepository } from '../repositories/user';

export class SigninRoutes {
  public router: Router;
  private signinController: SigninController;

  constructor() {
    const signinRepo = new SigninUserRepository();
    const signinUseCase = new SigninUseCase(signinRepo);
    this.router = Router();
    this.signinController = new SigninController(signinUseCase);
    this.iniRoutes();
  }

  iniRoutes() {
    this.router.post(
      '/',
      this.signinController.signin.bind(this.signinController)
    );
  }
}
