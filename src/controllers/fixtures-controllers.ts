import { Request, Response, NextFunction } from 'express';
import { FixturesUseCase } from '../use-cases';
import { FixturesInput, FixturesQueries, FixturesScores } from '../entities';
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
    try {
      const fixtures = await this.fixturesUseCase.findByLeague({
        leagueId,
        round,
      });
      return res.status(200).json(fixtures);
    } catch (error) {
      next(error);
    }
  }

  async findByTeam(req: Request, res: Response, next: NextFunction) {
    const { teamId }: FixturesQueries = req.params;
    const { round }: FixturesQueries = req.query;
    try {
      const fixtures = await this.fixturesUseCase.findByTeam({
        teamId,
        round,
      });
      return res.status(200).json(fixtures);
    } catch (error) {
      next(error);
    }
  }

  async updateScores(req: Request, res: Response, next: NextFunction) {
    const { id }: FixturesScores = req.params;
    const { homeScore, awayScore, homePenalty, awayPenalty }: FixturesScores =
      req.body;
    const fxParams = new FixturesScores(
      id,
      homeScore,
      awayScore,
      homePenalty,
      awayPenalty
    );
    try {
      new Validator(fxParams).blank().missing();
      const fixtures = await this.fixturesUseCase.updateScores(fxParams);
      return res.status(200).json(fixtures);
    } catch (error) {
      next(error);
    }
  }
}
