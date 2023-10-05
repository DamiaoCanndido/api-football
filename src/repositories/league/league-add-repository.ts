import { prisma } from '../../infra';
import { League } from '../../entities';
import { LeagueAddInterface } from '../../interfaces/league';
import { HttpException } from '../../errors';

export class LeagueAddRepository implements LeagueAddInterface {
  async add(lgParam: League): Promise<League> {
    try {
      const countryExists = await prisma.team.findUnique({
        where: {
          id: lgParam.countryId!,
        },
      });

      if (!countryExists) {
        throw new HttpException(404, 'country id not found.');
      }

      const league = await prisma.league.create({
        data: {
          name: lgParam.name,
          logo: lgParam.logo,
          season: lgParam.season,
          type: lgParam.type,
          numberOfRounds: lgParam.numberOfRounds,
          rounds: lgParam.rounds,
          countryId: lgParam.countryId,
        },
      });
      return league;
    } catch (error) {
      throw new HttpException(404, 'country id not valid.');
    }
  }
}
