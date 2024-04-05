import { prisma } from '../../infra';
import { TeamInput, TeamOutput } from '../../entities';
import { TeamAddInterface } from '../../interfaces/team';
import { HttpException } from '../../errors';

export class TeamAddRepository implements TeamAddInterface {
  async add(team: TeamInput): Promise<TeamOutput> {
    try {
      const newTeam = await prisma.team.create({
        data: team,
      });
      return newTeam;
    } catch (error) {
      if (error instanceof HttpException) {
        throw new HttpException(error.status, error.message);
      }
      throw new HttpException(400, 'Database error.');
    }
  }
}
