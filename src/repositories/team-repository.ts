import { prisma } from '../infra';
import { Team, TeamQueries } from '../entities';
import {
  TeamAddInterface,
  TeamSearchInterface,
  TeamFindoneInterface,
} from '../interfaces/team';
import { HttpException } from '../errors';

export class TeamRepository
  implements TeamAddInterface, TeamSearchInterface, TeamFindoneInterface
{
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

  async search({ code, name }: TeamQueries): Promise<Team[]> {
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

  async findOne(id: string): Promise<Team> {
    try {
      const team = await prisma.team.findUnique({
        where: {
          id,
        },
      });
      return team!;
    } catch {
      throw new HttpException(400, 'id doesnt exists.');
    }
  }
}
