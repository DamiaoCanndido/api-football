import { Request, Response, NextFunction } from 'express';
import { TeamUseCase } from '../use-cases';
import { Team, TeamQueries } from '../entities';
import { Validator } from '../errors';

export class TeamController {
  constructor(private teamUseCase: TeamUseCase) {}

  async add(req: Request, res: Response, next: NextFunction) {
    const { name, code, logo, countryId }: Team = req.body;
    try {
      new Validator<Team>({ name, code, logo, countryId }).blank().missing();
      const team = await this.teamUseCase.add({ name, code, logo, countryId });
      return res.status(201).json(team);
    } catch (error) {
      next(error);
    }
  }

  async search(req: Request, res: Response, next: NextFunction) {
    const { name, code, country, league }: TeamQueries = req.query;
    try {
      const teams = await this.teamUseCase.search({
        name,
        code,
        country,
        league,
      });
      return res.status(200).json(teams);
    } catch (error) {
      next(error);
    }
  }
}
