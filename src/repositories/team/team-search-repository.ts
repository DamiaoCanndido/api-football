import { prisma } from '../../infra';
import { Team, TeamQueries } from '../../entities';
import { TeamSearchInterface } from '../../interfaces/team';

export class TeamSearchRepository implements TeamSearchInterface {
  async search({ code, name, isCountry }: TeamQueries): Promise<Team[]> {
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
        isCountry: isCountry !== undefined ?? true,
      },
    });
    return teams;
  }
}
