import { useState, useEffect } from 'react';
import { getTeams, joinTeam, getUserTeam, leaveTeam, createTeam } from '../services/teams';
import type { TeamWithMembers } from '../../backend/src/types/team';

export const useTeams = () => {
  const [teams, setTeams] = useState<TeamWithMembers[]>([]);
  const [userTeamId, setUserTeamId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [teamsData, teamId] = await Promise.all([getTeams(), getUserTeam()]);
      setTeams(teamsData);
      setUserTeamId(teamId);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const handleJoinTeam = async (team_id: number) => {
    try {
      await joinTeam(team_id);
      await fetchData();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
    }
  };

  const handleLeaveTeam = async () => {
    try {
      await leaveTeam();
      await fetchData();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
    }
  };

  const handleCreateTeam = async (teamName: string) => {
    try {
        await createTeam(teamName);
        await fetchData();
    } catch (err: unknown) {
        setError(err instanceof Error ? err.message : 'Erro desconhecido');
    }
};

return { teams, userTeamId, loading, error, handleJoinTeam, handleLeaveTeam, handleCreateTeam };
  
  
};

