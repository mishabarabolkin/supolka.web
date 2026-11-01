import { useQuery } from '@tanstack/react-query';
import { getSystemPing } from './get-system-ping';
import { systemPingQueryKey } from './query-keys';

export function useSystemPing() {
  return useQuery({
    queryKey: systemPingQueryKey,
    queryFn: getSystemPing,
  });
}
