import { prisma } from '../../infra';
import { TeamOutput, TeamQueries } from '../../entities';
import { TeamSearchInterface } from '../../interfaces/team';

export class TeamSearchRepository implements TeamSearchInterface {
  async search({ name, type, country }: TeamQueries): Promise<TeamOutput[]> {
    const teams = await prisma.team.findMany({
      where: {
        name: {
          contains: name,
          mode: 'insensitive',
        },
        type,
        country: {
          contains: country,
          mode: 'insensitive',
        },
      },
      orderBy: {
        name: 'asc',
      },
    });
    return teams;
  }
}
