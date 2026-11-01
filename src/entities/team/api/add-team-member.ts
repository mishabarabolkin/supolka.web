import type { TeamMember } from '../model/types';
import { teamHttp } from './team-http';

export function addTeamMember(
  token: string,
  teamId: string,
  userId: string,
): Promise<TeamMember> {
  return teamHttp<TeamMember>(`/teams/${teamId}/members`, token, {
    method: 'POST',
    body: { userId },
  });
}
