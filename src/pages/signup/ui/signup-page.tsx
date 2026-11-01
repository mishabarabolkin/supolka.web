import { RegisterForm } from '@/features/register';
import { SessionScreen } from '@/pages/session';

export function SignupPage() {
  return <SessionScreen signedOut={<RegisterForm />} />;
}
