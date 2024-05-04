import { prisma } from '../../infra';
import { LeagueInput, LeagueOutput } from '../../entities';
import { LeagueAddInterface } from '../../interfaces/league';
import { HttpException } from '../../errors';

export class LeagueAddRepository implements LeagueAddInterface {
  async add(lgParam: LeagueInput): Promise<LeagueOutput> {
    try {
      const league = await prisma.league.create({
        data: {
          name: lgParam.name,
          logo: lgParam.logo,
          season: lgParam.season,
          type: lgParam.type,
          numberOfRounds: lgParam.numberOfRounds,
          rounds: lgParam.rounds,
          country: lgParam.country,
        },
      });
      return league;
    } catch (error) {
      if (error instanceof HttpException) {
        throw new HttpException(error.status, error.message);
      }
      throw new HttpException(400, 'Database error.');
    }
  }
}
