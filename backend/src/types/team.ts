export interface Team {
  id: number;
  team_name: string;
  is_full: boolean;
  created_at: string;
}

export interface UserTeam {
  user_id: number;
  team_id: number;
}

export interface TeamMember {
  user_id: number;
  users: {
    id: number,
    name: string;
  }[];
}

export interface TeamWithMembers extends Team {
  user_team: {
    user_id: number;
    users: {
      id: number;
      name: string;
    };
  }[];
}