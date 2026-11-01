import type { Team } from '../model/types';
import { teamHttp } from './team-http';

export function getTeam(token: string, teamId: string): Promise<Team> {
  return teamHttp<Team>(`/teams/${teamId}`, token);
}
