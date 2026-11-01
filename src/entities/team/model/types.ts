export type TeamType = 'O' | 'I';

export type Team = {
  id: string;
  createAt: number;
  updateAt: number;
  name: string;
  displayName: string;
  description: string;
  type: string;
};

export type TeamMember = {
  teamId: string;
  userId: string;
  roles: string;
};
