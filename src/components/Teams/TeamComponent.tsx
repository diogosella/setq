import "./TeamComponent.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRightLong } from '@fortawesome/free-solid-svg-icons'
import { useTeams } from "../../hooks/useTeams";

export default function TeamComponent() {
    const { teams, userTeamId, loading, error, handleJoinTeam } = useTeams();
    const slots = Array.from({ length: 6 });    
    
    if (loading) return <img src="src\assets\images\loading.gif" className="loadingTeams" />;
    
    if (error) return <div>Erro: {error}</div>;

    return (
        <>
            {teams.map(team => {
                // membros vêm direto do team.user_team agora
                const members = team.user_team ?? [];

                return (
                    <div key={team.id} className="displayBox">
                        <h1 className="teamName">{team.team_name}</h1>

                        <ul className="displayMembers">
                            {slots.map((_, index) => {
                                const member = members[index];

                                return (
                                    <li key={index} className={member ? "filledSpot" : "freeSpot"}>
                                        {member ? member.users.name : "Vaga aberta"}
                                    </li>
                                )
                            })}
                        </ul>

                        <hr className="hrLine" />

                        <div className="buttonContainer">
                            {userTeamId === team.id ? (
                                <span className="alreadyTeamed">Você está nesse time</span>
                            ) : team.is_full ? (
                                <span className="fullTeamWarn">Time cheio</span>
                            ) : (
                                <button 
                                    className="joinButton" 
                                    onClick={() => handleJoinTeam(team.id)} 
                                    disabled={userTeamId !== null}
                                >
                                    <FontAwesomeIcon className="joinIcon" icon={faArrowRightLong} />
                                    Entrar
                                </button>
                            )}
                        </div>
                    </div>
                );
            })}
        </>
    );
}