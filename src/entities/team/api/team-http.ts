import { http, type HttpOptions } from '@/shared/api';

export async function teamHttp<T>(
  path: string,
  token: string,
  options: Omit<HttpOptions, 'token'> = {},
): Promise<T> {
  const { body } = await http<T>(path, { ...options, token });
  return body;
}
