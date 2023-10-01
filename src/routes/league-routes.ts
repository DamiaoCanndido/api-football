import { Router } from 'express';
import { LeagueRepository } from '../repositories';
import { LeagueUseCase } from '../use-cases';
import { LeagueController } from '../controllers';

export class LeagueRoutes {
  public router: Router;
  private leagueController: LeagueController;

  constructor() {
    this.router = Router();
    const leagueRepository = new LeagueRepository();
    const leagueUseCase = new LeagueUseCase(leagueRepository);
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
