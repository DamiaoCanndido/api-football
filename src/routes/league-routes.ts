import { Router } from 'express';
import {
  LeagueAddRepository,
  LeagueSearchRepository,
  LeagueFindoneRepository,
  LeagueDeleteRepository,
} from '../repositories/league';
import { LeagueUseCase } from '../use-cases';
import { LeagueController } from '../controllers';
import { AuthMiddleware } from '../middlewares';

export class LeagueRoutes {
  public router: Router;
  private leagueController: LeagueController;
  private auth = new AuthMiddleware();

  constructor() {
    this.router = Router();
    const leagueAddRepository = new LeagueAddRepository();
    const leagueSearchRepository = new LeagueSearchRepository();
    const leagueFindoneRepository = new LeagueFindoneRepository();
    const leagueDeleteRepository = new LeagueDeleteRepository();
    const leagueUseCase = new LeagueUseCase(
      leagueAddRepository,
      leagueSearchRepository,
      leagueFindoneRepository,
      leagueDeleteRepository
    );
    this.leagueController = new LeagueController(leagueUseCase);
    this.initRoutes();
  }

  initRoutes() {
    this.router.post(
      '/',
      this.auth.protect,
      this.leagueController.add.bind(this.leagueController)
    );
    this.router.get(
      '/',
      this.leagueController.search.bind(this.leagueController)
    );
    this.router.get(
      '/:id',
      this.leagueController.findOne.bind(this.leagueController)
    );
    this.router.delete(
      '/:id',
      this.auth.protect,
      this.leagueController.delete.bind(this.leagueController)
    );
  }
}
