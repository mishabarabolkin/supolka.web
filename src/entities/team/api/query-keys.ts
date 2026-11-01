export const teamQueryRoot = ['team'] as const;

export const myTeamsQueryKey = [...teamQueryRoot, 'mine'] as const;

export function teamQueryKey(teamId: string) {
  return [...teamQueryRoot, 'one', teamId] as const;
}

export function teamMembersQueryKey(teamId: string) {
  return [...teamQueryRoot, 'members', teamId] as const;
}
