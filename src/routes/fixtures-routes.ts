import { Router } from 'express';
import {
  FixturesAddRepository,
  FixturesFindByLeagueRepository,
  FixturesFindByTeamRepository,
  FixturesUpdateScoresRepository,
  FixturesGroupByDatesRepository,
  FixturesDeleteRepository,
  FixturesRescheduledRepository,
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
    const groupByDatesRepo = new FixturesGroupByDatesRepository();
    const deleteRepo = new FixturesDeleteRepository();
    const rescheludeRepo = new FixturesRescheduledRepository();
    const fixturesUseCase = new FixturesUseCase(
      addRepo,
      findByLeagueRepo,
      findByTeamRepo,
      updateScoresRepo,
      groupByDatesRepo,
      deleteRepo,
      rescheludeRepo
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
    this.router.get(
      '/',
      this.fixturesController.groupByDates.bind(this.fixturesController)
    );
    this.router.delete(
      '/:id',
      this.fixturesController.delete.bind(this.fixturesController)
    );
    this.router.patch(
      '/:id',
      this.fixturesController.reschelude.bind(this.fixturesController)
    );
  }
}
