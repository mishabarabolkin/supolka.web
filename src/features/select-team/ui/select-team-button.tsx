import type { Team } from '@/entities/team';
import { writeTeamId } from '@/shared/session';

export function SelectTeamButton({
  team,
  selected,
}: {
  team: Team;
  selected: boolean;
}) {
  const mark = Array.from(team.displayName)[0] ?? '';

  return (
    <button
      type="button"
      aria-label={team.displayName}
      aria-pressed={selected}
      onClick={() => writeTeamId(team.id)}
    >
      {mark}
    </button>
  );
}
