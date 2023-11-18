import { prisma } from '../../infra';
import axios from 'axios';
import { GoogleAccountInput, GoogleAccountOutput } from '../../entities';
import { GoogleAccountInterface } from '../../interfaces/google-account';
import { HttpException } from '../../errors';

export class GoogleAccountRepository implements GoogleAccountInterface {
  async signin(accessToken: GoogleAccountInput): Promise<GoogleAccountOutput> {
    try {
      const userResponse = await axios.get(
        'https://www.googleapis.com/oauth2/v2/userinfo',
        {
          headers: { Authorization: `Bearer ${accessToken.accessToken}` },
        }
      );
      const userData = userResponse.data;
      let user = await prisma.googleAccount.findUnique({
        where: {
          googleId: userData.id,
        },
      });
      if (!user) {
        user = await prisma.googleAccount.create({
          data: {
            googleId: userData.id,
            name: userData.name,
            email: userData.email,
            picture: userData.picture,
          },
        });
      }
      return user;
    } catch (error) {
      if (error instanceof HttpException) {
        throw new HttpException(error.status, error.message);
      }
      throw new HttpException(400, 'Database error.');
    }
  }
}
