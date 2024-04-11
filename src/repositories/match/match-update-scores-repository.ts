import { prisma } from '../../infra';
import { MatchScores, MatchOutput } from '../../entities';
import { MatchUpdateScoresInterface } from '../../interfaces/match';
import { HttpException } from '../../errors';

export class MatchUpdateScoresRepository implements MatchUpdateScoresInterface {
  async updateScores({
    id,
    homeScore,
    awayScore,
    homePenalty,
    awayPenalty,
  }: MatchScores): Promise<MatchOutput> {
    try {
      const match = await prisma.match.findUnique({ where: { id } });
      if (!match) {
        throw new HttpException(404, 'Match id not found.');
      }
      const fixturesCreated = await prisma.match.update({
        where: {
          id,
        },
        data: {
          homeScore,
          awayScore,
          homePenalty,
          awayPenalty,
          fullTime: true,
        },
        include: {
          home: true,
          away: true,
          league: {
            select: {
              name: true,
            },
          },
        },
      });

      return fixturesCreated;
    } catch (error) {
      if (error instanceof HttpException) {
        throw new HttpException(error.status, error.message);
      }
      throw new HttpException(400, 'Database error.');
    }
  }
}
