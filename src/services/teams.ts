import { supabase } from '../supabase.ts';
import type { Team, TeamMember, TeamWithMembers } from '../../backend/src/types/team.ts';

export const getTeams = async (): Promise<TeamWithMembers[]> => {
  const { data, error } = await supabase
    .from('teams')
    .select(`
      *,
      user_team (
        user_id,
        users (
          id,
          name
        )
      )
    `);

  if (error) throw error;
  return data ?? [];
};


export const createTeam = async (team_name: string): Promise<Team[]> => {
    const {data, error} = await supabase
    .from('teams')
    .insert([{team_name, is_full: false}])
    .select()
    .single();

    if (error) throw error;
    return data;
}

export const updateTeam = async (id: number, updates: Partial<Team>): Promise<Team> => {

  const { data, error } = await supabase
    .from('teams')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const deleteTeam = async (id: number): Promise<void> => {
  const { error } = await supabase
    .from('teams')
    .delete()
    .eq('id', id);

  if (error) throw error;
};

export const joinTeam = async (team_id: number): Promise<void> => {
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) throw new Error('Usuário não autenticado');

  const { error } = await supabase
    .from('user_team') 
    .insert([{
      user_id: user.id,
      team_id: team_id
    }]);

  if (error) throw error;
};

export const getUserTeam = async (): Promise<number | null> => {
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return null;

  const { data, error } = await supabase
    .from('user_teams')
    .select('team_id')
    .eq('user_id', user.id)
    .single();

  if (error) return null;
  return data?.team_id ?? null;
};

export const getTeamMembers = async (team_id: number): Promise<TeamMember[]> => {
  const { data, error } = await supabase
    .from('user_team')
    .select(`
      user_id,
      users (id, name)
    `)
    .eq('team_id', team_id);

  if (error) throw error;
  return (data as TeamMember[]) ?? [];
};