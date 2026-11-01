import { http } from '@/shared/api';
import type { UserProfile } from '../model/types';

export type RegisterUserInput = {
  email: string;
  username: string;
  password: string;
};

export async function registerUser(
  input: RegisterUserInput,
): Promise<UserProfile> {
  const { body } = await http<UserProfile>('/users', {
    method: 'POST',
    body: input,
  });
  return body;
}
