import { Request, Response, NextFunction } from 'express';
import { prisma } from '../infra/database';
import jwt from 'jsonwebtoken';
import { HttpException } from '../errors';

interface TokenPayload {
  id: string;
  iat: number;
  exp: number;
}

export class AuthMiddleware {
  async auth(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers;

    if (!authorization) {
      throw new HttpException(403, 'Token does not exist.');
    }

    const token = authorization.replace('Bearer', '').trim();

    try {
      const data = jwt.verify(token, process.env.JWT_SECRET!);
      const { id } = data as TokenPayload;
      req.userId = id;
      await prisma.googleAccount.findUnique({
        where: { id: req.userId },
      });
      return next();
    } catch (err) {
      throw new HttpException(403, 'Token does not match');
    }
  }

  async protect(req: Request, res: Response, next: NextFunction) {
    const authorization = req.headers['founder'];
    if (!authorization || authorization != process.env.FOUNDER_KEY) {
      return res
        .status(401)
        .json({ status: 401, message: 'You are not a founder.' });
    }
    return next();
  }
}
