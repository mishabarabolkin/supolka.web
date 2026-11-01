import type { Team } from '@/entities/team';
import { SelectTeamButton } from '@/features/select-team';

export function TeamSidebar({
  teams,
  selectedId,
}: {
  teams: Team[];
  selectedId: string | null;
}) {
  return (
    <aside className="team-sidebar" aria-label="Команды">
      {teams.map((team) => (
        <SelectTeamButton
          key={team.id}
          team={team}
          selected={team.id === selectedId}
        />
      ))}
    </aside>
  );
}
