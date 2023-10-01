import { prisma } from '../infra';
import { League } from '../entities';
import { LeagueAddInterface } from '../interfaces/league';

export class LeagueRepository implements LeagueAddInterface {
  async add(lgParam: League): Promise<League> {
    const league = await prisma.league.create({
      data: {
        name: lgParam.name,
        logo: lgParam.logo,
        season: lgParam.season,
        type: lgParam.type,
        countryId: lgParam.countryId,
        numberOfRounds: lgParam.numberOfRounds,
        rounds: lgParam.rounds!,
      },
    });
    return league;
  }
}
