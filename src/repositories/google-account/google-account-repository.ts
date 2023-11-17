import { prisma } from '../../infra';
import axios from 'axios';
import { GoogleAccountInput, GoogleAccountOutput } from '../../entities';
import { GoogleAccountInterface } from '../../interfaces/google-account';

export class GoogleAccountRepository implements GoogleAccountInterface {
  async signin(accessToken: GoogleAccountInput): Promise<GoogleAccountOutput> {
    const userResponse = await axios.get(
      'https://www.googleapis.com/oauth2/v2/userinfo',
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    const userData = userResponse.data;
    let user = await prisma.googleAccount.findUnique({
      where: {
        googleId: userData.googleId,
      },
    });
    if (!user) {
      user = await prisma.googleAccount.create({
        data: {
          email: userData.email,
          googleId: userData.googleId,
          name: userData.name,
          picture: userData.picture,
        },
      });
    }
    return user;
  }
}
