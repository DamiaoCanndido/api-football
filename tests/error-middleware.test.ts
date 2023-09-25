import { NextFunction, Request, Response } from 'express';
import { errorMiddleware } from '../src/middlewares';
import { HttpException } from '../src/errors';

describe('Error middleware', () => {
  it('should respond with th correct status and message HttpException', () => {
    const httpException: HttpException = {
      name: 'HttpException',
      status: 400,
      message: 'Some field is missing.',
    };
    const req: Partial<Request> = {};
    const res: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next: NextFunction = jest.fn();
    errorMiddleware(httpException, req as Request, res as Response, next);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      status: 400,
      message: 'Some field is missing.',
    });
  });
});
