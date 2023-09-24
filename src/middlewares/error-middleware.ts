import { Request, Response, NextFunction } from 'express';
import { HttpException } from '../errors/http-exception';
import { httpResponses } from '../errors/http-responses';

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
