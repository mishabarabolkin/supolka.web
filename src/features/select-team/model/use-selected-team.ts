import { useLayoutEffect } from 'react';
import type { Team } from '@/entities/team';
import { clearTeamId, useTeamId } from '@/shared/session';

export function useSelectedTeam(teams: Team[] | undefined): Team | null {
  const teamId = useTeamId();

  useLayoutEffect(() => {
    if (teams === undefined || teamId === null) {
      return;
    }

    if (!teams.some((team) => team.id === teamId)) {
      clearTeamId();
    }
  }, [teams, teamId]);

  if (teams === undefined || teamId === null) {
    return null;
  }

  return teams.find((team) => team.id === teamId) ?? null;
}
