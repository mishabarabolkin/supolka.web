import {
  useMyTeams,
  useTeam,
  useTeamMembers,
  type Team,
} from '@/entities/team';
import type { UserProfile } from '@/entities/user';
import { AddTeamMemberForm } from '@/features/add-team-member';
import { CreateTeamForm } from '@/features/create-team';
import { useSelectedTeam } from '@/features/select-team';
import { TeamSidebar } from '@/widgets/team-sidebar';
import { CurrentUserCard } from './current-user-card';

export function SignedInSession({ user }: { user: UserProfile }) {
  const teamsQuery = useMyTeams();
  const selected = useSelectedTeam(teamsQuery.data);

  return (
    <div className="session-layout">
      <TeamSidebar
        teams={teamsQuery.data ?? []}
        selectedId={selected?.id ?? null}
      />
      <main className="auth-screen">
        <CurrentUserCard user={user} />
        {selected ? <SelectedTeam team={selected} /> : null}
        <CreateTeamForm />
      </main>
    </div>
  );
}

function SelectedTeam({ team }: { team: Team }) {
  const teamQuery = useTeam(team.id);
  const membersQuery = useTeamMembers(team.id);
  const shown = teamQuery.data ?? team;

  return (
    <section>
      <p>{shown.displayName}</p>
      <p>{shown.name}</p>
      {membersQuery.data ? (
        <ul className="team-members">
          {membersQuery.data.map((member) => (
            <li key={member.userId}>{member.userId}</li>
          ))}
        </ul>
      ) : null}
      <AddTeamMemberForm teamId={team.id} />
    </section>
  );
}
