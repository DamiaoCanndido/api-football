import { HttpException } from './http-exception';

export function httpResponses(error: HttpException) {
  if (error.message.search('prisma') > 0) {
    return {
      message: 'Validation error.',
      status: 400,
    };
  }
  return {
    message: error.message,
    status: error.status,
  };
}
