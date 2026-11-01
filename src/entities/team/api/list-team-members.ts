import type { TeamMember } from '../model/types';
import { teamHttp } from './team-http';

export function listTeamMembers(
  token: string,
  teamId: string,
): Promise<TeamMember[]> {
  return teamHttp<TeamMember[]>(`/teams/${teamId}/members`, token);
}
