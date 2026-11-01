import { http } from '@/shared/api';

export async function logoutUser(token: string): Promise<void> {
  await http<{ status: string }>('/users/logout', {
    method: 'POST',
    token,
  });
}
