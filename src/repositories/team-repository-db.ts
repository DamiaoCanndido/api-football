import { prisma } from '../infra';
import { Team, TeamQueries } from '../entities';
import { TeamRepository } from '../interfaces';
import { HttpException } from '../errors';

export class TeamRepositoryDB implements TeamRepository {
  async add({ name, code, logo, countryId }: Team): Promise<Team> {
    try {
      await prisma.country.findUnique({
        where: {
          id: countryId,
        },
      });
    } catch {
      throw new HttpException(400, 'country id not valid.');
    }

    const team = await prisma.team.create({
      data: {
        name,
        code,
        logo,
        countryId,
      },
    });
    return team;
  }

  async search({ code, name, country, league }: TeamQueries): Promise<Team[]> {
    const teams = await prisma.team.findMany({
      where: {
        name: {
          contains: name,
          mode: 'insensitive',
        },
        code: {
          contains: code,
          mode: 'insensitive',
        },
        country: {
          name: {
            contains: country,
            mode: 'insensitive',
          },
        },
        // league ID
      },
    });
    return teams;
  }
}
