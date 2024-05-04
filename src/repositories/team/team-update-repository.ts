import { prisma } from '../../infra';
import { TeamOutput, TeamUpdate } from '../../entities';
import { TeamUpdateInterface } from '../../interfaces/team';
import { HttpException } from '../../errors';

export class TeamUpdateRepository implements TeamUpdateInterface {
  async update(
    id: number,
    { name, code, logo, type, country }: TeamUpdate
  ): Promise<TeamOutput> {
    try {
      const team = await prisma.team.findUnique({
        where: {
          id,
        },
      });
      if (!team) {
        throw new HttpException(404, 'Id invalid.');
      }
      const teamUpdated = await prisma.team.update({
        where: { id },
        data: { name, code, logo, type, country },
      });
      return teamUpdated;
    } catch (error) {
      if (error instanceof HttpException) {
        throw new HttpException(error.status, error.message);
      }
      throw new HttpException(400, 'Database error.');
    }
  }
}
