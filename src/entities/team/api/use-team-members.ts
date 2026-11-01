import { useQuery } from '@tanstack/react-query';
import { useToken } from '@/shared/session';
import { listTeamMembers } from './list-team-members';
import { teamMembersQueryKey } from './query-keys';

export function useTeamMembers(teamId: string) {
  const token = useToken();

  return useQuery({
    queryKey: teamMembersQueryKey(teamId),
    queryFn: () => listTeamMembers(token ?? '', teamId),
    enabled: token !== null,
    retry: false,
  });
}
