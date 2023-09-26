import { NextFunction, Request, Response } from 'express';
import { getMockReq, getMockRes } from '@jest-mock/express';
import { errorMiddleware } from '../src/middlewares';
import { HttpException } from '../src/errors';

describe('Error middleware', () => {
  it('should respond with th correct status and message HttpException', () => {
    const httpException: HttpException = {
      name: 'HttpException',
      status: 400,
      message: 'Some field is missing.',
    };
    const req: Request = getMockReq();
    const res: Response = getMockRes().res;
    const next: NextFunction = getMockRes().next;
    errorMiddleware(httpException, req, res, next);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      status: 400,
      message: 'Some field is missing.',
    });
  });
});
