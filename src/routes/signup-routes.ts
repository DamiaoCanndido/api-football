import { Router } from 'express';
import { SignupController } from '../controllers';
import { SignupUseCase } from '../use-cases';
import { SignupUserRepository } from '../repositories/user';

export class SignupRoutes {
  public router: Router;
  private signupController: SignupController;

  constructor() {
    const signupRepo = new SignupUserRepository();
    const signupUseCase = new SignupUseCase(signupRepo);
    this.router = Router();
    this.signupController = new SignupController(signupUseCase);
    this.iniRoutes();
  }

  iniRoutes() {
    this.router.post(
      '/',
      this.signupController.signup.bind(this.signupController)
    );
  }
}
