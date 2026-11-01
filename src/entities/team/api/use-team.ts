import { useQuery } from '@tanstack/react-query';
import { useToken } from '@/shared/session';
import { getTeam } from './get-team';
import { teamQueryKey } from './query-keys';

export function useTeam(teamId: string) {
  const token = useToken();

  return useQuery({
    queryKey: teamQueryKey(teamId),
    queryFn: () => getTeam(token ?? '', teamId),
    enabled: token !== null,
    retry: false,
  });
}
