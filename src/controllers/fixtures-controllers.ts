import { Request, Response, NextFunction } from 'express';
import { FixturesUseCase } from '../use-cases';
import { FixturesInput, FixturesQueries } from '../entities';
import { Validator } from '../errors';

export class FixturesController {
  constructor(private fixturesUseCase: FixturesUseCase) {}

  async add(req: Request, res: Response, next: NextFunction) {
    const fxParam: FixturesInput = req.body;
    const params = new FixturesInput(
      fxParam.startDate,
      fxParam.homeId,
      fxParam.awayId,
      fxParam.leagueId,
      fxParam.round
    );
    try {
      new Validator<FixturesInput>(params).blank().missing();
      const fixtures = await this.fixturesUseCase.add(params);
      return res.status(201).json(fixtures);
    } catch (error) {
      next(error);
    }
  }

  async findByLeague(req: Request, res: Response, next: NextFunction) {
    const { leagueId }: FixturesQueries = req.params;
    const { round }: FixturesQueries = req.query;
    const { teamId }: FixturesQueries = req.body;
    try {
      const fixtures = await this.fixturesUseCase.findByLeague({
        leagueId,
        round,
        teamId,
      });
      return res.status(200).json(fixtures);
    } catch (error) {
      next(error);
    }
  }
}
