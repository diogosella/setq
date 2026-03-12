import Header from "../../components/Header";
import './teamsPage.css'

export default function Teams() {
    return (
        <div className="contentContainer">
            <Header />
            <div className="teamsTitle">
                <h1 className="teamsText">Inscrições Abertas</h1>
                <p className="teamsShift">Noturno (18:30 - 20:00)</p>
            </div>
            <div className="teamsSelection">
                <button className="teamsButton">Entrar em um time</button>
                <button className="teamsButton">Criar time</button>
            </div>
            <div className="teamsDisplay">
                <h1 className="teamsText">TIMES ABERTOS(1)</h1>
                <div className="displayBox">
                    <h1 className="teamsText">SetQ Development</h1>
                    <ul className="displayMembers">
                        <li>Diogo</li>
                        <li>Luiz</li>
                        <li>Hugo</li>
                        <li>Vaga aberta</li>
                        <li>Vaga aberta</li>
                        <li>Vaga aberta</li>
                    </ul>
                    <p className="displayAlreadyIn">Você está nesse time</p>
                </div>
            </div>
        </div>
    )
}