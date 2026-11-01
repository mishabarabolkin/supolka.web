import { ApiError } from './api-error';
import { runMiddlewares } from './middleware';
import { sessionExpiredMiddleware } from './session-middleware';

export type HttpMethod = 'GET' | 'POST';

export type HttpOptions = {
  method?: HttpMethod;
  body?: unknown;
  token?: string;
};

export type HttpResult<T> = {
  body: T;
  token: string | null;
};

export type HttpContext = {
  path: string;
  options: HttpOptions;
  result?: HttpResult<unknown>;
};

type ErrorPayload = {
  id?: unknown;
  message?: unknown;
};

export async function http<T>(
  path: string,
  options: HttpOptions = {},
): Promise<HttpResult<T>> {
  const context: HttpContext = { path, options };

  await runMiddlewares(context, [
    sessionExpiredMiddleware,
    async (current) => {
      current.result = await request<T>(current.path, current.options);
    },
  ]);

  return context.result as HttpResult<T>;
}

async function request<T>(
  path: string,
  options: HttpOptions,
): Promise<HttpResult<T>> {
  const headers: Record<string, string> = {};

  if (options.body !== undefined) {
    headers['Content-Type'] = 'application/json';
  }

  if (options.token) {
    headers.Authorization = `Bearer ${options.token}`;
  }

  const response = await fetch(`/api/v1${path}`, {
    method: options.method ?? 'GET',
    headers,
    body:
      options.body !== undefined ? JSON.stringify(options.body) : undefined,
  });

  const tokenHeader = response.headers.get('Token')?.trim() ?? '';
  const token = tokenHeader.length > 0 ? tokenHeader : null;

  if (!response.ok) {
    throw await apiError(response);
  }

  const body = (await response.json()) as T;
  return { body, token };
}

async function apiError(response: Response): Promise<ApiError> {
  let id = '';
  let message = '';

  try {
    const payload = (await response.json()) as ErrorPayload;
    if (typeof payload.id === 'string') {
      id = payload.id;
    }
    if (typeof payload.message === 'string') {
      message = payload.message;
    }
  } catch {
    message = '';
  }

  return new ApiError(id, message, response.status);
}
