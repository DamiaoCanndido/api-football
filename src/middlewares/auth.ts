import { Request, Response, NextFunction } from 'express';

export class AuthMiddleware {
  async protect(req: Request, res: Response, next: NextFunction) {
    const authorization = req.headers['founder'];
    if (!authorization || authorization !== process.env.FOUNDER_KEY) {
      return res
        .status(401)
        .json({ status: 401, message: 'You are not a founder.' });
    }
    return next();
  }
}
