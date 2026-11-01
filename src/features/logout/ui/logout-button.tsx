import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import { currentUserQueryKey, logoutUser } from '@/entities/user';
import { ApiError } from '@/shared/api';
import { clearToken, useToken } from '@/shared/session';

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
      clearToken();
      queryClient.removeQueries({ queryKey: currentUserQueryKey });
      navigate('/login');
    } catch (error) {
      if (error instanceof ApiError && error.status === 401) {
        clearToken();
        queryClient.removeQueries({ queryKey: currentUserQueryKey });
        navigate('/login');
        return;
      }
      setPending(false);
    }
  }

  return (
    <button type="button" onClick={onClick} disabled={pending}>
      Выйти
    </button>
  );
}
