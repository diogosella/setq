import { useState, useEffect } from 'react';
import { getTeams, getTeamMembers, joinTeam, getUserTeam } from '../services/teams';
import type { TeamWithMembers, TeamMember } from '../../backend/src/types/team';

export const useTeams = () => {
  const [teams, setTeams] = useState<TeamWithMembers[]>([]);
  const [userTeamId, setUserTeamId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [teamMembers, setTeamMembers] = useState<Record<number, TeamMember[]>>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Busca tudo junto em um só useEffect
        const [teamsData, teamId] = await Promise.all([getTeams(), getUserTeam()]);

        setTeams(teamsData);
        setUserTeamId(teamId);

        // Busca membros de cada time
        const membersMap: Record<number, TeamMember[]> = {};
        for (const team of teamsData) {
          membersMap[team.id] = await getTeamMembers(team.id);
        }
        setTeamMembers(membersMap);

      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Erro desconhecido");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleJoinTeam = async (team_id: number) => {
    try {
      await joinTeam(team_id);
      setUserTeamId(team_id);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Erro desconhecido");
      }
    }
  };

  return { teams, teamMembers, userTeamId, loading, error, handleJoinTeam };
};