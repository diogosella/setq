import Header from "../../components/Header";
import TeamComponent from "../../components/Teams/TeamComponent";
import { useTeams } from "../../hooks/useTeams";
import './teamsPage.css'



export default function Teams() {
    const { teams, loading } = useTeams();

        const availableTeams = teams.filter(team => !team.is_full);
    
    return (
        <div className="contentContainer">
            <Header />
            <div className="teamsTitle">
                <h1 className="teamsText">Inscrições abertas</h1>
                <p className="teamsShift">Noturno (18:30 - 20:00)</p>
            </div>
            <div className="teamsSelection">
                <button className="teamsButton">Criar time</button>
            </div>
            <div className="teamsDisplay">
                <h1 className="availableTeams">TIMES ABERTOS ({loading ? (<span>...</span>) : (availableTeams.length) })</h1>
                    <TeamComponent/>
            </div>
        </div>
    )
}