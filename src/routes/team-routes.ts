import { Router } from 'express';
import {
  TeamAddRepository,
  TeamSearchRepository,
  TeamFindoneRepository,
  TeamFindByLeagueRepository,
  TeamUpdateRepository,
  TeamDeleteRepository,
} from '../repositories/team';
import { TeamUseCase } from '../use-cases';
import { TeamController } from '../controllers';
import { AuthMiddleware } from '../middlewares';

export class TeamRoutes {
  public router: Router;
  private teamController: TeamController;
  private auth = new AuthMiddleware();

  constructor() {
    this.router = Router();
    const addRepo = new TeamAddRepository();
    const searchRepo = new TeamSearchRepository();
    const findoneRepo = new TeamFindoneRepository();
    const findByLeagueRepo = new TeamFindByLeagueRepository();
    const updateTeamRepo = new TeamUpdateRepository();
    const deleteTeamRepo = new TeamDeleteRepository();
    const teamUseCase = new TeamUseCase(
      addRepo,
      searchRepo,
      findoneRepo,
      findByLeagueRepo,
      updateTeamRepo,
      deleteTeamRepo
    );
    this.teamController = new TeamController(teamUseCase);
    this.initRoutes();
  }

  initRoutes() {
    this.router.post(
      '/',
      this.auth.protect,
      this.teamController.add.bind(this.teamController)
    );
    this.router.get('/', this.teamController.search.bind(this.teamController));
    this.router.get(
      '/:id',
      this.teamController.findOne.bind(this.teamController)
    );
    this.router.get(
      '/:leagueId/league',
      this.teamController.findByLeague.bind(this.teamController)
    );
    this.router.put(
      '/:id',
      this.auth.protect,
      this.teamController.update.bind(this.teamController)
    );
    this.router.delete(
      '/:id',
      this.auth.protect,
      this.teamController.delete.bind(this.teamController)
    );
  }
}
