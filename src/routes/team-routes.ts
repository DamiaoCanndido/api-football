import { Router } from 'express';
import { TeamRepositoryDB } from '../repositories';
import { TeamUseCase } from '../use-cases';
import { TeamController } from '../controllers';

export class TeamRoutes {
  public router: Router;
  private teamController: TeamController;

  constructor() {
    this.router = Router();
    const teamRepositoryDB = new TeamRepositoryDB();
    const teamUseCase = new TeamUseCase(teamRepositoryDB);
    this.teamController = new TeamController(teamUseCase);
    this.initRoutes();
  }

  initRoutes() {
    this.router.post('/', this.teamController.add.bind(this.teamController));
    this.router.get('/', this.teamController.search.bind(this.teamController));
  }
}
