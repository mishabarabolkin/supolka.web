import { http } from '@/shared/api';
import type { UserProfile } from '../model/types';

export async function getCurrentUser(token: string): Promise<UserProfile> {
  const { body } = await http<UserProfile>('/users/me', { token });
  return body;
}
