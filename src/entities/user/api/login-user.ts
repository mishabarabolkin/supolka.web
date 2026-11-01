import { ApiError, http } from '@/shared/api';
import type { UserProfile } from '../model/types';

export type LoginUserInput = {
  login_id: string;
  password: string;
};

export async function loginUser(input: LoginUserInput): Promise<string> {
  const { token } = await http<UserProfile>('/users/login', {
    method: 'POST',
    body: input,
  });

  if (!token) {
    throw new ApiError('', 'В ответе нет заголовка Token', 500);
  }

  return token;
}
