import { LoginForm } from '@/features/login';
import { SessionScreen } from '@/pages/session';

export function LoginPage() {
  return <SessionScreen signedOut={<LoginForm />} />;
}
