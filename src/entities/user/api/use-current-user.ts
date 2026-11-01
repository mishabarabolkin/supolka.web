import { useQuery } from '@tanstack/react-query';
import { useToken } from '@/shared/session';
import { getCurrentUser } from './get-current-user';
import { currentUserQueryKey } from './query-keys';

export function useCurrentUser() {
  const token = useToken();

  return useQuery({
    queryKey: currentUserQueryKey,
    queryFn: () => getCurrentUser(token ?? ''),
    enabled: token !== null,
    retry: false,
  });
}
