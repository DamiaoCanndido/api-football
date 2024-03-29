import { prisma } from '../../infra';
import { TeamOutput } from '../../entities';
import { TeamDeleteInterface } from '../../interfaces/team';
import { HttpException } from '../../errors';

export class TeamDeleteRepository implements TeamDeleteInterface {
  async delete(id: string): Promise<TeamOutput> {
    try {
      const team = await prisma.team.findUnique({
        where: {
          id,
        },
      });
      if (!team) {
        throw new HttpException(404, 'Id invalid.');
      }
      await prisma.team.delete({ where: { id } });
      return team;
    } catch (error) {
      if (error instanceof HttpException) {
        throw new HttpException(error.status, error.message);
      }
      throw new HttpException(400, 'Database error.');
    }
  }
}
