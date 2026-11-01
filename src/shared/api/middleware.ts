import { ApiError } from './api-error';

export type Next = () => Promise<void>;

export type Middleware<TContext> = (
  context: TContext,
  next: Next,
) => Promise<void>;

export async function runMiddlewares<TContext>(
  context: TContext,
  middlewares: Array<Middleware<TContext>>,
): Promise<void> {
  let index = -1;

  const dispatch = async (current: number): Promise<void> => {
    if (current <= index) {
      throw new Error('next() called more than once');
    }

    index = current;
    const middleware = middlewares[current];
    if (!middleware) {
      return;
    }

    await middleware(context, () => dispatch(current + 1));
  };

  await dispatch(0);
}

export function apiErrorMiddleware(
  setErrorMessage: (message: string) => void,
  setPending: (pending: boolean) => void,
): Middleware<null> {
  return async (_context, next) => {
    try {
      await next();
    } catch (error) {
      setPending(false);
      if (error instanceof ApiError) {
        setErrorMessage(error.message);
        return;
      }
      throw error;
    }
  };
}
