import { Router } from 'express';
import { FixturesAddRepository } from '../repositories/fixtures';
import { FixturesUseCase } from '../use-cases';
import { FixturesController } from '../controllers';

export class FixturesRoutes {
  public router: Router;
  private fixturesController: FixturesController;

  constructor() {
    this.router = Router();
    const addRepo = new FixturesAddRepository();
    const fixturesUseCase = new FixturesUseCase(addRepo);
    this.fixturesController = new FixturesController(fixturesUseCase);
    this.initRoutes();
  }

  initRoutes() {
    this.router.post(
      '/',
      this.fixturesController.add.bind(this.fixturesController)
    );
  }
}
