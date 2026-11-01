import type { Team } from '../model/types';
import { teamHttp } from './team-http';

export function listMyTeams(token: string): Promise<Team[]> {
  return teamHttp<Team[]>('/users/me/teams', token);
}
