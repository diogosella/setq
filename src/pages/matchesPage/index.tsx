import Header from '../../components/Header';
import { useMatches } from '../../hooks/useMatches';
import './matchesPage.css';

export default function MatchesPage() {
  const { teamA, teamB, queue, loading } = useMatches();

  if (loading) return <img src="src/assets/images/loading.gif" />;

  return (
    <div className="contentContainer">
      <Header />

      <div className="currentMatch">
        <h1>Jogando agora</h1>
        <div className="matchup">
          <div className='TeamA'>
            {teamA ? teamA.team_name : 'Aguardando time...'}
          </div>
          <span className="vs">VS</span>
          <div className='TeamB'>
            {teamB ? teamB.team_name : 'Aguardando time...'}
          </div>
        </div>
      </div>

      <div className="teamsList">
        <h2>Fila de times</h2>
        {queue.length === 0 ? (
          <p>Nenhum time na fila</p>
        ) : (
          <ul>
            {queue.map((team, index) => (
              <li key={team.id}>
                <span className="queuePosition">{index + 1}º</span>
                {team.team_name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}