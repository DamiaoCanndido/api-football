import { Request, Response, NextFunction } from 'express';
import { TeamUseCase } from '../use-cases';
import { Team, TeamInput, TeamQueries, TeamUpdate } from '../entities';

export class TeamController {
  constructor(private teamUseCase: TeamUseCase) {}

  // POST: /team
  async add(req: Request, res: Response, next: NextFunction) {
    const param: TeamInput = req.body;
    try {
      new Team(param);
      const team = await this.teamUseCase.add(param);
      return res.status(201).json(team);
    } catch (error) {
      next(error);
    }
  }

  // GET: /team?name=&code=%type=
  async search(req: Request, res: Response, next: NextFunction) {
    const { name, code, type }: TeamQueries = req.query;
    try {
      const teams = await this.teamUseCase.search({
        name,
        code,
        type,
      });
      return res.status(200).json(teams);
    } catch (error) {
      next(error);
    }
  }

  // GET: /team/:id
  async findOne(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const team = await this.teamUseCase.findOne(id);
      return res.status(200).json(team);
    } catch (error) {
      next(error);
    }
  }

  // GET: /team/:leagueId/league
  async findByLeague(req: Request, res: Response, next: NextFunction) {
    const { leagueId } = req.params;
    try {
      const teams = await this.teamUseCase.findByLeague(leagueId);
      return res.status(200).json(teams);
    } catch (error) {
      next(error);
    }
  }

  // PUT: /team/:id
  async updateTeam(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const params: TeamUpdate = req.body;
    try {
      const teams = await this.teamUseCase.update(id, params);
      return res.status(200).json(teams);
    } catch (error) {
      next(error);
    }
  }
}
