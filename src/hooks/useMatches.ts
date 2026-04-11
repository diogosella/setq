
import { useState, useEffect } from 'react';
import { getFullTeams } from '../services/teams';
import type { FullTeam } from '../../backend/src/types/team';

export const useMatches = () => {
  const [fullTeams, setFullTeams] = useState<FullTeam[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getFullTeams()
      .then(setFullTeams)
      .finally(() => setLoading(false));
  }, []);

  const teamA = fullTeams[0] ?? null;
  const teamB = fullTeams[1] ?? null;
  const queue = fullTeams.slice(2);

  return { teamA, teamB, queue, loading };
};