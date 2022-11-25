import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const Register = () => {

    const navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [passwd, setPasswd] = useState("")
    const [repasswd, setRepasswd] = useState("")
    const [nombre, setNombre] = useState("")

    const onSubmit = (e) => {
        e.preventDefault()

        // Se envian los datos para validar la sesion
    }

    return (
        <div id='login'>
            <div id='login-d1' >
                <p className='logo'>exam<p className='logo-x'>X</p></p>
                <img src="../../public/images/personal-settings.png" alt="iniciar-sesion-imagen" />
            </div>

            <div id='login-d2'>
                <p id='login-d2-title'>Regístrate</p>
                <form onSubmit={(e) => onSubmit(e)}>
                    <input
                        type="email"
                        placeholder='Correo'
                        value={ email }
                        onChange = { e => setEmail(e.target.value) }
                    />
                    <input
                        type="password"
                        placeholder='Contraseña'
                        value={ passwd }
                        onChange = { e => setPasswd(e.target.value) }
                    />
                    <input
                        type="password"
                        placeholder='Repetir contraseña'
                        value={ repasswd }
                        onChange = { e => setRepasswd(e.target.value) }
                    />
                    <input
                        type="text"
                        placeholder='Nombre'
                        value={ nombre }
                        onChange = { e => setNombre(e.target.value) }
                    />
                </form>

                <button className='auth-btn' type="submit" onClick={ () => navigate("/")}>Entrar</button>
                <button className='auth-btn' onClick={ () => navigate("/auth/login")}>Iniciar sesión</button>

                <p id='login-d2-forg'>¿Olvidaste tu contraseña? <br /> Haz clic <a href="#">aquí</a></p>
            </div>
        </div>
    )
}
