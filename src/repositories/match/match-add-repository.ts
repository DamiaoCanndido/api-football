import { prisma } from '../../infra';
import { dateNow } from '../../helpers';
import { MatchInput, MatchOutput, LeagueOutput } from '../../entities';
import { MatchAddInterface } from '../../interfaces/match';
import { HttpException } from '../../errors';

export class MatchAddRepository implements MatchAddInterface {
  async add(mtParam: MatchInput): Promise<MatchOutput> {
    let leagueExists: LeagueOutput | null;
    try {
      const teamsExists = await prisma.team.findMany({
        where: {
          id: {
            in: [mtParam.homeId, mtParam.awayId],
          },
        },
      });

      if (teamsExists.length < 2) {
        throw new HttpException(400, 'Some team is missing.');
      }

      if (mtParam.leagueId) {
        leagueExists = await prisma.league.findUnique({
          where: {
            id: mtParam.leagueId,
          },
        });
        if (!leagueExists) {
          throw new HttpException(404, 'league id not valid.');
        }
      }

      if (new Date(mtParam.startDate).getTime() < dateNow) {
        throw new HttpException(400, 'start date not valid.');
      }

      const match = await prisma.match.create({
        data: {
          startDate: new Date(mtParam.startDate),
          homeId: mtParam.homeId,
          awayId: mtParam.awayId,
          leagueId: mtParam.leagueId!,
          round: leagueExists!
            ? leagueExists!.rounds[mtParam.round! - 1]
            : undefined,
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
      return match;
    } catch (error) {
      if (error instanceof HttpException) {
        throw new HttpException(error.status, error.message);
      }
      throw new HttpException(400, 'Database error.');
    }
  }
}
