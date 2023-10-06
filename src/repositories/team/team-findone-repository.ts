import { prisma } from '../../infra';
import { Team } from '../../entities';
import { TeamFindoneInterface } from '../../interfaces/team';
import { HttpException } from '../../errors';

export class TeamFindoneRepository implements TeamFindoneInterface {
  async findOne(id: string): Promise<Team> {
    try {
      const team = await prisma.team.findUnique({
        where: {
          id,
        },
      });
      if (!team) {
        throw new HttpException(404, 'Id invalid.');
      }
      return team;
    } catch {
      throw new HttpException(404, 'Id invalid.');
    }
  }
}
