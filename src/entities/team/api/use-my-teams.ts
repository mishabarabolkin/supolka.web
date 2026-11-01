import { useQuery } from '@tanstack/react-query';
import { useToken } from '@/shared/session';
import { listMyTeams } from './list-my-teams';
import { myTeamsQueryKey } from './query-keys';

export function useMyTeams() {
  const token = useToken();

  return useQuery({
    queryKey: myTeamsQueryKey,
    queryFn: () => listMyTeams(token ?? ''),
    enabled: token !== null,
    retry: false,
  });
}
