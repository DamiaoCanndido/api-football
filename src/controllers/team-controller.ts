import { Request, Response, NextFunction } from 'express';
import { TeamUseCase } from '../use-cases';
import { Team, TeamInput, TeamQueries } from '../entities';

export class TeamController {
  constructor(private teamUseCase: TeamUseCase) {}

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

  async findOne(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const team = await this.teamUseCase.findOne(id);
      return res.status(200).json(team);
    } catch (error) {
      next(error);
    }
  }

  async findByLeague(req: Request, res: Response, next: NextFunction) {
    const { leagueId } = req.params;
    try {
      const teams = await this.teamUseCase.findByLeague(leagueId);
      return res.status(200).json(teams);
    } catch (error) {
      next(error);
    }
  }
}
