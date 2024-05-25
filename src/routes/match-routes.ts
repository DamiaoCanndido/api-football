import { Router } from 'express';
import {
  MatchAddRepository,
  MatchFindByLeagueRepository,
  MatchFindByTeamRepository,
  MatchUpdateScoresRepository,
  MatchGroupByDatesRepository,
  MatchDeleteRepository,
  MatchRescheduledRepository,
  MatchFindbyIdRepository,
} from '../repositories/match';
import { MatchUseCase } from '../use-cases';
import { MatchController } from '../controllers';
import { AuthMiddleware } from '../middlewares';

export class MatchRoutes {
  public router: Router;
  private matchController: MatchController;
  private auth = new AuthMiddleware();

  constructor() {
    this.router = Router();
    const addRepo = new MatchAddRepository();
    const findByLeagueRepo = new MatchFindByLeagueRepository();
    const findByTeamRepo = new MatchFindByTeamRepository();
    const updateScoresRepo = new MatchUpdateScoresRepository();
    const groupByDatesRepo = new MatchGroupByDatesRepository();
    const deleteRepo = new MatchDeleteRepository();
    const rescheludeRepo = new MatchRescheduledRepository();
    const findbyIdRepo = new MatchFindbyIdRepository();
    const fixturesUseCase = new MatchUseCase(
      addRepo,
      findByLeagueRepo,
      findByTeamRepo,
      updateScoresRepo,
      groupByDatesRepo,
      deleteRepo,
      rescheludeRepo,
      findbyIdRepo
    );
    this.matchController = new MatchController(fixturesUseCase);
    this.initRoutes();
  }

  initRoutes() {
    this.router.post(
      '/',
      this.auth.protect,
      this.matchController.add.bind(this.matchController)
    );
    this.router.get(
      '/:leagueId/league',
      this.matchController.findByLeague.bind(this.matchController)
    );
    this.router.get(
      '/:teamId/team',
      this.matchController.findByTeam.bind(this.matchController)
    );
    this.router.put(
      '/:id',
      this.auth.protect,
      this.matchController.updateScores.bind(this.matchController)
    );
    this.router.get(
      '/',
      this.matchController.groupByDates.bind(this.matchController)
    );
    this.router.delete(
      '/:id',
      this.auth.protect,
      this.matchController.delete.bind(this.matchController)
    );
    this.router.patch(
      '/:id',
      this.auth.protect,
      this.matchController.reschelude.bind(this.matchController)
    );
    this.router.get(
      '/:id',
      this.matchController.findById.bind(this.matchController)
    );
  }
}
