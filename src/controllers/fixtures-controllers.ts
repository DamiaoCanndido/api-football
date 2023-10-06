import { Request, Response, NextFunction } from 'express';
import { FixturesUseCase } from '../use-cases';
import { FixturesInput } from '../entities';
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
}
