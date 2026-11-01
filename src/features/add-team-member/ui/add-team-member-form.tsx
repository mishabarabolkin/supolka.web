import { useState, type FormEvent } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import {
  addTeamMember,
  teamMembersQueryKey,
  type TeamMember,
} from '@/entities/team';
import { apiErrorMiddleware, runMiddlewares } from '@/shared/api';
import { useToken } from '@/shared/session';

export function AddTeamMemberForm({ teamId }: { teamId: string }) {
  const token = useToken();
  const queryClient = useQueryClient();
  const [userId, setUserId] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!token || pending) {
      return;
    }

    setErrorMessage(null);
    setPending(true);

    await runMiddlewares(null, [
      apiErrorMiddleware(setErrorMessage, setPending),
      async () => {
        const member = await addTeamMember(token, teamId, userId);
        const queryKey = teamMembersQueryKey(teamId);
        const existing = queryClient.getQueryData<TeamMember[]>(queryKey);
        if (existing) {
          queryClient.setQueryData<TeamMember[]>(
            queryKey,
            mergeMember(existing, member),
          );
        }
        await queryClient.invalidateQueries({ queryKey });
        setUserId('');
        setPending(false);
      },
    ]);
  }

  return (
    <form onSubmit={onSubmit}>
      <label>
        userId
        <input
          name="userId"
          value={userId}
          onChange={(event) => setUserId(event.target.value)}
        />
      </label>
      {errorMessage ? <p className="auth-error">{errorMessage}</p> : null}
      <button type="submit" disabled={pending}>
        Добавить участника
      </button>
    </form>
  );
}

function mergeMember(current: TeamMember[], member: TeamMember): TeamMember[] {
  const members = current.filter((item) => item.userId !== member.userId);
  members.push(member);
  members.sort((left, right) => {
    if (left.userId < right.userId) {
      return -1;
    }
    if (left.userId > right.userId) {
      return 1;
    }
    return 0;
  });
  return members;
}
