import "./TeamComponent.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRightLong } from '@fortawesome/free-solid-svg-icons'
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import type { TeamWithMembers } from '../../../backend/src/types/team'

type TeamComponentProps = {
    teams: TeamWithMembers[];
    loading: boolean;
    error: string | null;
    userTeamId: number | null;
    handleJoinTeam: (team_id: number) => Promise<void>;
    handleLeaveTeam: () => Promise<void>;
};

export default function TeamComponent({ teams, loading, error, userTeamId, handleJoinTeam, handleLeaveTeam }: TeamComponentProps) {
    const slots = Array.from({ length: 6 });    
    
    if (loading) return <img src="src\assets\images\loading.gif" className="loadingTeams" />;
    if (error) return <div>Erro: {error}</div>;

    return (
        <>
            {teams.map(team => {
                const members = team.user_team ?? [];
                return (
                    <div key={team.id} className="displayBox">
                        <h1 className="teamName">{team.team_name}</h1>
                        <ul className="displayMembers">
                            {slots.map((_, index) => {
                                const member = members[index];
                                return (
                                    <li key={index} className={member ? "filledSpot" : "freeSpot"}>
                                        {member ? member.users.name.split(' ').slice(0, 2).join(' ') : "Vaga aberta"}
                                    </li>
                                )
                            })}
                        </ul>
                        <hr className="hrLine" />
                        <div className="buttonContainer">
                            {userTeamId === team.id ? (
                                <div className="alreadyTeamedContainer">
                                    <span className="alreadyTeamed">Você está nesse time</span>
                                    <button className="leaveTeamButton" onClick={handleLeaveTeam}>
                                        <FontAwesomeIcon className="leaveIcon" icon={faRightFromBracket}/>
                                    </button>
                                </div>
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