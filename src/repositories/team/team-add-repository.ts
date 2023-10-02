import { prisma } from '../../infra';
import { Team } from '../../entities';
import { TeamAddInterface } from '../../interfaces/team';

export class TeamAddRepository implements TeamAddInterface {
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
}
