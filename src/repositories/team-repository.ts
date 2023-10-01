import { prisma } from '../infra';
import { Team, TeamQueries } from '../entities';
import { TeamInterface } from '../interfaces';

export class TeamRepository implements TeamInterface {
  async add({ name, code, logo }: Team): Promise<Team> {
    const team = await prisma.team.create({
      data: {
        name,
        code,
        logo,
      },
    });
    return team;
  }

  async search({ code, name, league }: TeamQueries): Promise<Team[]> {
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

        // league ID
      },
    });
    return teams;
  }
}
