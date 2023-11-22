import { prisma } from '../../infra';
import { MatchInput, MatchOutput } from '../../entities/match';
import { MatchInterface } from '../../interfaces/match';
import { HttpException } from '../../errors';

export class MatchRepository implements MatchInterface {
  async add(match: MatchInput): Promise<MatchOutput> {
    const allPlayers = await prisma.googleAccount.findMany({
      where: {
        id: {
          in: match.players,
        },
      },
    });
    if (allPlayers.length < 2) {
      throw new HttpException(400, 'players not found.');
    }
    const fixtures = await prisma.fixtures.findUnique({
      where: {
        id: match.fixturesId,
      },
    });
    if (!fixtures) {
      throw new HttpException(404, 'fixtures not found.');
    }
    const players = allPlayers.map((e) => {
      const { email, googleId, ...rest } = e;
      return {
        ...rest,
        points: 0,
        isAlive: true,
        guess: null,
      };
    });
    const matchCreated = await prisma.match.create({
      data: {
        players,
        winners: [],
        drawers: [],
        losers: [],
        fixturesId: match.fixturesId,
      },
    });
    return matchCreated;
  }
}
