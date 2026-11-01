import { useLayoutEffect, type ReactNode } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useLocation, useNavigate } from 'react-router';
import { currentUserQueryKey, useCurrentUser } from '@/entities/user';
import { LoginForm } from '@/features/login';
import { ApiError } from '@/shared/api';
import { useToken } from '@/shared/session';
import { SignedInSession } from './signed-in-session';

export function SessionScreen({ signedOut }: { signedOut: ReactNode }) {
  const token = useToken();
  const currentUser = useCurrentUser();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const location = useLocation();
  const rejected =
    currentUser.error instanceof ApiError && currentUser.error.status === 401;
  const onLoginRoute =
    location.pathname === '/' || location.pathname === '/login';

  useLayoutEffect(() => {
    if (!rejected) {
      return;
    }

    if (!onLoginRoute) {
      navigate('/login', { replace: true });
      return;
    }

    queryClient.removeQueries({ queryKey: currentUserQueryKey });
  }, [rejected, onLoginRoute, navigate, queryClient]);

  if (rejected && !currentUser.isFetching) {
    return <LoginForm />;
  }

  if (currentUser.data && token !== null) {
    return <SignedInSession user={currentUser.data} />;
  }

  if (token !== null && (currentUser.isPending || currentUser.isFetching)) {
    return <main className="auth-screen" />;
  }

  if (token === null) {
    return signedOut;
  }

  if (currentUser.isError) {
    const message =
      currentUser.error instanceof ApiError ? currentUser.error.message : null;
    return (
      <main className="auth-screen">
        {message ? <p className="auth-error">{message}</p> : null}
      </main>
    );
  }

  return <main className="auth-screen" />;
}
