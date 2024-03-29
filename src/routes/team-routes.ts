import { Router } from 'express';
import {
  TeamAddRepository,
  TeamSearchRepository,
  TeamFindoneRepository,
  TeamFindByLeagueRepository,
  TeamUpdateRepository,
} from '../repositories/team';
import { TeamUseCase } from '../use-cases';
import { TeamController } from '../controllers';

export class TeamRoutes {
  public router: Router;
  private teamController: TeamController;

  constructor() {
    this.router = Router();
    const addRepo = new TeamAddRepository();
    const searchRepo = new TeamSearchRepository();
    const findoneRepo = new TeamFindoneRepository();
    const findByLeagueRepo = new TeamFindByLeagueRepository();
    const updateTeamRepo = new TeamUpdateRepository()
    const teamUseCase = new TeamUseCase(
      addRepo,
      searchRepo,
      findoneRepo,
      findByLeagueRepo,
      updateTeamRepo
    );
    this.teamController = new TeamController(teamUseCase);
    this.initRoutes();
  }

  initRoutes() {
    this.router.post('/', this.teamController.add.bind(this.teamController));
    this.router.get('/', this.teamController.search.bind(this.teamController));
    this.router.get(
      '/:id',
      this.teamController.findOne.bind(this.teamController)
    );
    this.router.get(
      '/:leagueId/league',
      this.teamController.findByLeague.bind(this.teamController)
    );
    this.router.put('/:id', this.teamController.updateTeam.bind(this.teamController))
  }
}
