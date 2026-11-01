import type { UserProfile } from '@/entities/user';
import { LogoutButton } from '@/features/logout';

export function CurrentUserCard({ user }: { user: UserProfile }) {
  return (
    <main className="auth-screen">
      <p>{user.username}</p>
      <p>{user.email}</p>
      <p>{user.roles}</p>
      <LogoutButton />
    </main>
  );
}
