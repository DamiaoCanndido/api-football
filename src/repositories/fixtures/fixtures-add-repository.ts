import { prisma } from '../../infra';
import { dateNow } from '../../helpers';
import { FixturesInput, FixturesOutput, LeagueOutput } from '../../entities';
import { FixturesAddInterface } from '../../interfaces/fixtures';
import { HttpException } from '../../errors';

export class FixturesAddRepository implements FixturesAddInterface {
  async add(fxParam: FixturesInput): Promise<FixturesOutput> {
    let leagueExists: LeagueOutput | null;
    try {
      const teamsExists = await prisma.team.findMany({
        where: {
          id: {
            in: [fxParam.homeId, fxParam.awayId],
          },
        },
      });

      if (teamsExists.length < 2) {
        throw new HttpException(400, 'Some team is missing.');
      }

      if (fxParam.leagueId) {
        leagueExists = await prisma.league.findUnique({
          where: {
            id: fxParam.leagueId,
          },
        });
        if (!leagueExists) {
          throw new HttpException(404, 'league id not valid.');
        }
      }

      if (new Date(fxParam.startDate).getTime() < dateNow) {
        throw new HttpException(400, 'start date not valid.');
      }

      const fixtures = await prisma.fixtures.create({
        data: {
          startDate: new Date(fxParam.startDate),
          homeId: fxParam.homeId,
          awayId: fxParam.awayId,
          leagueId: fxParam.leagueId,
          round: leagueExists!
            ? leagueExists!.rounds[fxParam.round! - 1]
            : null,
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
      return fixtures;
    } catch (error) {
      if (error instanceof HttpException) {
        throw new HttpException(error.status, error.message);
      }
      throw new HttpException(400, 'Database error.');
    }
  }
}
