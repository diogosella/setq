import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signUp } from "../../services/auth";

export default function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState<string | null>(null)

  const handleRegister = async () => {
    setError(null)

    if (!email || !password) {
      setError('Preencha todos os campos')
      return
    }

    if (password !== confirmPassword) {
      setError('As senhas não coincidem')
      return
    }

    if (password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres')
      return
    }

    try {
      await signUp(email, password)

      alert('Conta criada com sucesso!')

      navigate('/')
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError('Erro ao cadastrar')
      }
    }
  }



    return (
        <div className="signinInputContainer">
            <p className='textTitle'>Criar conta</p>
            <h2>{error}</h2>
            <form onSubmit={(e) => e.preventDefault()}>
                <p className='formLabel'>Nome Completo</p>
                <input type="text" className='inputArea' placeholder="Insira seu nome completo" value={name} onChange={(e) => setName(e.target.value)} required/>
                <p className='formLabel'>E-mail</p>
                <input type="text" className='inputArea' placeholder="Insira seu Email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                <p className='formLabel'>Senha</p>
                <input type="password" className='inputArea' placeholder="Insira sua senha" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                <p className='formLabel'>Confirmar senha</p>
                <input type="password" className='inputArea' placeholder="Repita sua senha" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required/>
                <button className='mainButton' onClick={handleRegister}>Cadastrar</button>
            </form>
                {error && <p>{error}</p>}
                <Link to={'/'} className='secondaryButton'>Ja tenho conta</Link>
        </div>  
    ) 
}