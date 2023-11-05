import { prisma } from '../../infra';
import { TeamOutput, TeamQueries } from '../../entities';
import { TeamSearchInterface } from '../../interfaces/team';

export class TeamSearchRepository implements TeamSearchInterface {
  async search({ code, name, type }: TeamQueries): Promise<TeamOutput[]> {
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
        type,
      },
      orderBy: {
        name: 'asc',
      },
    });
    return teams;
  }
}
