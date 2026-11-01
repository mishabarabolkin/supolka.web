import { useState, type FormEvent } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import {
  createTeam,
  myTeamsQueryKey,
  type Team,
  type TeamType,
} from '@/entities/team';
import { apiErrorMiddleware, runMiddlewares } from '@/shared/api';
import { useToken, writeTeamId } from '@/shared/session';

export function CreateTeamForm() {
  const token = useToken();
  const queryClient = useQueryClient();
  const [name, setName] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [type, setType] = useState<TeamType>('O');
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
        const created = await createTeam(token, { name, displayName, type });
        queryClient.setQueryData<Team[]>(myTeamsQueryKey, (current) =>
          withTeam(current, created),
        );
        writeTeamId(created.id);
        await queryClient.invalidateQueries({ queryKey: myTeamsQueryKey });
        setName('');
        setDisplayName('');
        setType('O');
        setPending(false);
      },
    ]);
  }

  return (
    <form onSubmit={onSubmit}>
      <label>
        name
        <input
          name="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      </label>
      <label>
        displayName
        <input
          name="displayName"
          value={displayName}
          onChange={(event) => setDisplayName(event.target.value)}
        />
      </label>
      <label>
        type
        <select
          name="type"
          value={type}
          onChange={(event) => setType(event.target.value as TeamType)}
        >
          <option value="O">O</option>
          <option value="I">I</option>
        </select>
      </label>
      {errorMessage ? <p className="auth-error">{errorMessage}</p> : null}
      <button type="submit" disabled={pending}>
        Создать команду
      </button>
    </form>
  );
}

function withTeam(current: Team[] | undefined, created: Team): Team[] {
  const teams = (current ?? []).filter((team) => team.id !== created.id);
  teams.push(created);
  teams.sort((left, right) => {
    if (left.displayName < right.displayName) {
      return -1;
    }
    if (left.displayName > right.displayName) {
      return 1;
    }
    if (left.id < right.id) {
      return -1;
    }
    if (left.id > right.id) {
      return 1;
    }
    return 0;
  });
  return teams;
}
