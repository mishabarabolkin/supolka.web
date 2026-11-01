import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import { teamQueryRoot } from '@/entities/team';
import { currentUserQueryKey, logoutUser } from '@/entities/user';
import { ApiError } from '@/shared/api';
import { clearTeamId, clearToken, useToken } from '@/shared/session';

export function LogoutButton() {
  const token = useToken();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [pending, setPending] = useState(false);

  async function onClick() {
    if (!token || pending) {
      return;
    }

    setPending(true);

    try {
      await logoutUser(token);
      clearSession();
      navigate('/login');
    } catch (error) {
      if (error instanceof ApiError && error.status === 401) {
        clearSession();
        navigate('/login');
        return;
      }
      setPending(false);
    }
  }

  function clearSession() {
    clearToken();
    clearTeamId();
    queryClient.removeQueries({ queryKey: currentUserQueryKey });
    queryClient.removeQueries({ queryKey: teamQueryRoot });
  }

  return (
    <button type="button" onClick={onClick} disabled={pending}>
      Выйти
    </button>
  );
}
