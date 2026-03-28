import './disabledPage.css'
import Header from '../../components/Header'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock } from '@fortawesome/free-regular-svg-icons'
import { useEffect, useState } from 'react'

export default function Disabled() {

    const [timer, setTimer] = useState("00:00:00")

    function calcularTempo(){

        const agora = new Date()
        const minutos = agora.getHours() * 60 + agora.getMinutes()

        const h1430 = 14*60 + 30
        const h1500 = 15*60
        const h2030 = 20*60 + 30
        const h2100 = 21*60

        let alvo: Date

        if(minutos < h1430){
            alvo = new Date()
            alvo.setHours(14,30,0)
        }
        else if(minutos < h1500){
            // já abriu → vai pra próxima (20:30)
            alvo = new Date()
            alvo.setHours(20,30,0)
        }
        else if(minutos < h2030){
            alvo = new Date()
            alvo.setHours(20,30,0)
        }
        else if(minutos < h2100){
            // já abriu → próxima é amanhã 14:30
            alvo = new Date()
            alvo.setDate(alvo.getDate()+1)
            alvo.setHours(14,30,0)
        }
        else{
            alvo = new Date()
            alvo.setDate(alvo.getDate()+1)
            alvo.setHours(14,30,0)
        }

        const diff = alvo.getTime() - agora.getTime()

        const h = Math.floor(diff / 3600000)
        const m = Math.floor((diff % 3600000) / 60000)
        const s = Math.floor((diff % 60000) / 1000)

        const tempoFormatado =
            String(h).padStart(2,'0') + ":" +
            String(m).padStart(2,'0') + ":" +
            String(s).padStart(2,'0')

        setTimer(tempoFormatado)
    }

    useEffect(() => {

        calcularTempo()

        const interval = setInterval(calcularTempo, 1000)

        return () => clearInterval(interval)

    }, [])

    return (
        <div className="pageContainer">
            <Header/>        
            
            <div className="closedSign">
                <FontAwesomeIcon icon={faClock} className='closedIcon'/>
                <p className='closedText'>Inscrições fechadas</p>
            </div>

            <div className="closedSubtitle">
                <p className='closedInfo'>
                    As inscrições abrem <span>30 minutos</span> antes do horário do intervalo
                </p>
                <p className='breakHours'>
                    Vespertino: 14:30 | Noturno: 20:30
                </p>
            </div>

            <div className="closedTimer">
                <p className='timerTitle'>Próxima abertura em</p>
                <span className='timer'>{timer}</span>
            </div>

        </div>
    )
}