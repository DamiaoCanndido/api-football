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
      return team!;
    } catch {
      throw new HttpException(400, 'id doesnt exists.');
    }
  }
}
