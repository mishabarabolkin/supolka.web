import type { Team, TeamType } from '../model/types';
import { teamHttp } from './team-http';

export type CreateTeamInput = {
  name: string;
  displayName: string;
  type: TeamType;
};

export function createTeam(
  token: string,
  input: CreateTeamInput,
): Promise<Team> {
  return teamHttp<Team>('/teams', token, {
    method: 'POST',
    body: input,
  });
}
