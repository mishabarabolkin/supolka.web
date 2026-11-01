import { ApiError, http } from '@/shared/api';
import { clearToken, readToken } from '@/shared/session';
import type { UserProfile } from '../model/types';

export async function getCurrentUser(token: string): Promise<UserProfile> {
  try {
    const { body } = await http<UserProfile>('/users/me', { token });
    return body;
  } catch (error) {
    if (
      error instanceof ApiError &&
      error.status === 401 &&
      readToken() === token
    ) {
      clearToken();
    }
    throw error;
  }
}
