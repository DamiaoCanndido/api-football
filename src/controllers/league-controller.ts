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
    const { name }: LeagueQueries = req.query;
    try {
      const leagues = await this.leagueUseCase.search({
        name,
      });
      return res.status(200).json(leagues);
    } catch (error) {
      next(error);
    }
  }

  async findOne(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const league = await this.leagueUseCase.findOne(id);
      return res.status(200).json(league);
    } catch (error) {
      next(error);
    }
  }

  async findbyCountry(req: Request, res: Response, next: NextFunction) {
    const { countryId }: LeagueQueries = req.params;
    try {
      const leagues = await this.leagueUseCase.findByCountry(countryId);
      return res.status(200).json(leagues);
    } catch (error) {
      next(error);
    }
  }
}
