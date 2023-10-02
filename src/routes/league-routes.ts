import { Router } from 'express';
import { LeagueAddRepository } from '../repositories/league';
import { LeagueUseCase } from '../use-cases';
import { LeagueController } from '../controllers';

export class LeagueRoutes {
  public router: Router;
  private leagueController: LeagueController;

  constructor() {
    this.router = Router();
    const leagueAddRepository = new LeagueAddRepository();
    const leagueUseCase = new LeagueUseCase(leagueAddRepository);
    this.leagueController = new LeagueController(leagueUseCase);
    this.initRoutes();
  }

  initRoutes() {
    this.router.post(
      '/',
      this.leagueController.add.bind(this.leagueController)
    );
  }
}
