import { Request, Response, NextFunction } from 'express';
import { HttpException, httpResponses } from '../errors';

export function errorMiddleware(
  err: HttpException,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const status: number = httpResponses(err).status;
  const message: string = httpResponses(err).message;

  res.status(status).json({
    status,
    message,
  });
}
