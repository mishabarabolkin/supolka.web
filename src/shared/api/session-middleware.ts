import { clearToken, readToken } from '@/shared/session';
import { ApiError } from './api-error';
import type { HttpContext } from './http';
import type { Middleware } from './middleware';

export const sessionExpiredMiddleware: Middleware<HttpContext> = async (
  context,
  next,
) => {
  try {
    await next();
  } catch (error) {
    if (
      error instanceof ApiError &&
      error.status === 401 &&
      context.options.token &&
      readToken() === context.options.token
    ) {
      clearToken();
    }
    throw error;
  }
};
