import { Request, Response, NextFunction } from 'express';
import { TeamUseCase } from '../use-cases';
import { Team, TeamQueries } from '../entities';
import { Validator } from '../errors';

export class TeamController {
  constructor(private teamUseCase: TeamUseCase) {}

  async add(req: Request, res: Response, next: NextFunction) {
    const { name, code, logo }: Team = req.body;
    const param = { name, code, logo };
    try {
      new Validator<Team>(param).blank().missing();
      const team = await this.teamUseCase.add(param);
      return res.status(201).json(team);
    } catch (error) {
      next(error);
    }
  }

  async search(req: Request, res: Response, next: NextFunction) {
    const { name, code, league }: TeamQueries = req.query;
    try {
      const teams = await this.teamUseCase.search({
        name,
        code,
        league,
      });
      return res.status(200).json(teams);
    } catch (error) {
      next(error);
    }
  }
}
