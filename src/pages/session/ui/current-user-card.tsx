import type { UserProfile } from '@/entities/user';
import { LogoutButton } from '@/features/logout';

export function CurrentUserCard({ user }: { user: UserProfile }) {
  return (
    <>
      <p>{user.username}</p>
      <p>{user.email}</p>
      <p>{user.roles}</p>
      <LogoutButton />
    </>
  );
}
