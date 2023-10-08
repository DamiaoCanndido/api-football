import { Router } from 'express';
import {
  FixturesAddRepository,
  FixturesFindByLeagueRepository,
  FixturesFindByTeamRepository,
  FixturesUpdateScoresRepository,
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
    const findByTeamRepo = new FixturesFindByTeamRepository();
    const updateScoresRepo = new FixturesUpdateScoresRepository();
    const fixturesUseCase = new FixturesUseCase(
      addRepo,
      findByLeagueRepo,
      findByTeamRepo,
      updateScoresRepo
    );
    this.fixturesController = new FixturesController(fixturesUseCase);
    this.initRoutes();
  }

  initRoutes() {
    this.router.post(
      '/',
      this.fixturesController.add.bind(this.fixturesController)
    );
    this.router.get(
      '/:leagueId/league',
      this.fixturesController.findByLeague.bind(this.fixturesController)
    );
    this.router.get(
      '/:teamId/team',
      this.fixturesController.findByTeam.bind(this.fixturesController)
    );
    this.router.put(
      '/:id',
      this.fixturesController.updateScores.bind(this.fixturesController)
    );
  }
}
