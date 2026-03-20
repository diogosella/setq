import './header.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'
import logo from "../../assets/images/white-logo.png"


export default function Header() {
    
    const navigate = useNavigate()

    return (
        <>
        <div className="headerContainer">
            <div className="logo">
                <img className='logoIcon' src={logo} />
                <p className='logoText'>FATEC SetQ</p>
            </div>

            <div className="exit">
                <button onClick={() => navigate(-1)}>
                    <FontAwesomeIcon className='exitIcon' icon={faRightFromBracket}/>
                </button>
            </div>
        </div>
        </>
    )
}