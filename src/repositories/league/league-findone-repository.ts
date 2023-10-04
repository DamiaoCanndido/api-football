import { prisma } from '../../infra';
import { League } from '../../entities';
import { LeagueFindoneInterface } from '../../interfaces/league';
import { HttpException } from '../../errors';

export class LeagueFindoneRepository implements LeagueFindoneInterface {
  async findOne(id: string): Promise<League> {
    try {
      const league = await prisma.league.findUnique({
        where: {
          id,
        },
      });
      if (!league) {
        throw new HttpException(400, 'Id invalid.');
      }
      return league;
    } catch {
      throw new HttpException(400, 'Id invalid.');
    }
  }
}
