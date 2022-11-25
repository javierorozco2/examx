import React, { useState } from 'react'

export const Login = () => {

    const [email, setEmail] = useState("")
    const [passwd, setPasswd] = useState("")

    const onSubmit = (e) => {
        e.preventDefault()

        // Se envian los datos para validar la sesion
    }

    return (
        <div id='login'>
            <div id='login-d1' >
                <p className='logo'>exam<p className='logo-x'>X</p></p>
                <img src="../../public/images/working-man.png" alt="iniciar-sesion-imagen" />
            </div>

            <div id='login-d2'>
                <p id='login-d2-title'>Iniciar sesión</p>
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
                </form>

                <button className='auth-btn' type="submit">Entrar</button>
                <button className='auth-btn'>Regístrate</button>

                <p id='login-d2-forg'>¿Olvidaste tu contraseña? <br /> Haz clic <a href="#">aquí</a></p>
            </div>
        </div>
    )
}
