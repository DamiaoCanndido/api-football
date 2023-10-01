import { Request, Response, NextFunction } from 'express';
import { LeagueUseCase } from '../use-cases';
import { League } from '../entities';
import { Validator } from '../errors';

export class LeagueController {
  constructor(private leagueUseCase: LeagueUseCase) {}

  async add(req: Request, res: Response, next: NextFunction) {
    const {
      name,
      type,
      logo,
      season,
      numberOfRounds,
      rounds,
      numberOfGroups,
      numberOfRoundsByGroup,
      playoffStages,
      countryId,
    }: League = req.body;

    const league = new League(
      name,
      type,
      logo,
      season,
      numberOfRounds,
      rounds,
      numberOfGroups,
      numberOfRoundsByGroup,
      playoffStages,
      countryId
    );

    try {
      new Validator<League>(league).blank().missing();
      const country = await this.leagueUseCase.add({ ...league });
      return res.status(201).json(country);
    } catch (error) {
      next(error);
    }
  }
}
