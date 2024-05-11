import { Request, Response, NextFunction } from 'express';
import { MatchUseCase } from '../use-cases';
import { Match, MatchInput, MatchQueries, MatchScores } from '../entities';

export class MatchController {
  constructor(private matchUseCase: MatchUseCase) {}

  async add(req: Request, res: Response, next: NextFunction) {
    const mtParam: MatchInput = req.body;

    try {
      new Match(mtParam);
      const match = await this.matchUseCase.add(mtParam);
      return res.status(201).json(match);
    } catch (error) {
      next(error);
    }
  }

  async findByLeague(req: Request, res: Response, next: NextFunction) {
    const { leagueId } = req.params;
    const { round }: MatchQueries = req.query;
    try {
      const match = await this.matchUseCase.findByLeague({
        leagueId: Number(leagueId),
        round,
      });
      return res.status(200).json(match);
    } catch (error) {
      next(error);
    }
  }

  async findByTeam(req: Request, res: Response, next: NextFunction) {
    const { teamId } = req.params;
    try {
      const match = await this.matchUseCase.findByTeam({
        teamId: Number(teamId),
      });
      return res.status(200).json(match);
    } catch (error) {
      next(error);
    }
  }

  async updateScores(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const { homeScore, awayScore, homePenalty, awayPenalty }: MatchScores =
      req.body;

    try {
      const iMatch = new MatchScores(
        Number(id),
        homeScore,
        awayScore,
        homePenalty,
        awayPenalty
      );
      const match = await this.matchUseCase.updateScores(iMatch);
      return res.status(200).json(match);
    } catch (error) {
      next(error);
    }
  }

  async groupByDates(req: Request, res: Response, next: NextFunction) {
    try {
      const match = await this.matchUseCase.groupByDates();
      return res.status(200).json(match);
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const match = await this.matchUseCase.delete(Number(id));
      return res.status(200).json(match);
    } catch (error) {
      next(error);
    }
  }

  async reschelude(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const { startDate }: MatchInput = req.body;

    try {
      const match = await this.matchUseCase.reschedule(Number(id), startDate);
      return res.status(200).json(match);
    } catch (error) {
      next(error);
    }
  }
}
