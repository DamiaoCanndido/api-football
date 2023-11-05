import { prisma } from '../../infra';
import { TeamInput, TeamOutput } from '../../entities';
import { TeamAddInterface } from '../../interfaces/team';

export class TeamAddRepository implements TeamAddInterface {
  async add(team: TeamInput): Promise<TeamOutput> {
    const newTeam = await prisma.team.create({
      data: team,
    });
    return newTeam;
  }
}
