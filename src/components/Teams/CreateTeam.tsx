import './CreateTeam.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react';

type CreateTeamProps = {
  setCreateTeam: React.Dispatch<React.SetStateAction<boolean>>;
  handleCreateTeam: (teamName: string) => Promise<void>;
};

export default function CreateTeam({ setCreateTeam, handleCreateTeam }: CreateTeamProps) {
    const [teamName, setTeamName] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!teamName.trim()) return;

        await handleCreateTeam(teamName);
        setCreateTeam(false);
    };

    return (
        <div className="createTeamContainer">
            <div className='createTeamHeadline'>
                <h2 className='componentTitle'>Crie seu time</h2>
                <button className="createTeamCloseButton" onClick={() => setCreateTeam(false)}>
                    <FontAwesomeIcon className='closeIcon' icon={faXmark}/>
                </button>
            </div>

            <form className='createTeamForm' onSubmit={handleSubmit}>
                <label className='createTeamLabel' htmlFor="teamName">Nome do Time:</label>
                <input
                    className='createTeamInput'
                    type="text"
                    id="teamName"
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                />
                <button className='createTeamButton' type="submit">Criar</button>
            </form>
        </div>
    );
}