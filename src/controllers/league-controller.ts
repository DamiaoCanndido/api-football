import { Request, Response, NextFunction } from 'express';
import { LeagueUseCase } from '../use-cases';
import { League, LeagueInput, LeagueQueries } from '../entities';

export class LeagueController {
  constructor(private leagueUseCase: LeagueUseCase) {}

  async add(req: Request, res: Response, next: NextFunction) {
    const param: LeagueInput = req.body;

    try {
      new League(param);
      const country = await this.leagueUseCase.add(param);
      return res.status(201).json(country);
    } catch (error) {
      next(error);
    }
  }

  async search(req: Request, res: Response, next: NextFunction) {
    const { name, country }: LeagueQueries = req.query;
    try {
      const leagues = await this.leagueUseCase.search({
        name,
        country,
      });
      return res.status(200).json(leagues);
    } catch (error) {
      next(error);
    }
  }

  async findOne(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const league = await this.leagueUseCase.findOne(Number(id));
      return res.status(200).json(league);
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const league = await this.leagueUseCase.delete(Number(id));
      return res.status(200).json(league);
    } catch (error) {
      next(error);
    }
  }

  async finish(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const league = await this.leagueUseCase.finish(Number(id));
      return res.status(200).json(league);
    } catch (error) {
      next(error);
    }
  }
}
