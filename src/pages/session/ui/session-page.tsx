import { LoginForm } from '@/features/login';
import { SessionScreen } from './session-screen';

export function SessionPage() {
  return <SessionScreen signedOut={<LoginForm />} />;
}
