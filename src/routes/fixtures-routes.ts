import { Router } from 'express';
import {
  FixturesAddRepository,
  FixturesFindByLeagueRepository,
} from '../repositories/fixtures';
import { FixturesUseCase } from '../use-cases';
import { FixturesController } from '../controllers';

export class FixturesRoutes {
  public router: Router;
  private fixturesController: FixturesController;

  constructor() {
    this.router = Router();
    const addRepo = new FixturesAddRepository();
    const findByLeagueRepo = new FixturesFindByLeagueRepository();
    const fixturesUseCase = new FixturesUseCase(addRepo, findByLeagueRepo);
    this.fixturesController = new FixturesController(fixturesUseCase);
    this.initRoutes();
  }

  initRoutes() {
    this.router.post(
      '/',
      this.fixturesController.add.bind(this.fixturesController)
    );
    this.router.get(
      '/',
      this.fixturesController.findByLeague.bind(this.fixturesController)
    );
  }
}
