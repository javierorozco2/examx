import React, { useMemo, useState } from 'react'
import { BiErrorAlt } from 'react-icons/bi'
import { FcGoogle } from "react-icons/fc"
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useForm } from '../../hooks/useForm'
import { startGoogleSignIn, startLoginWithEmailPass } from '../../store/auth/thunks'

const initialValues = {
    email: '',
    password: ''
}

export const Login = () => {

    const { status, errorMessage } = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { email, password, onInputChange } = useForm(initialValues)

    const onSubmit = (e) => {
        e.preventDefault()

        dispatch(startLoginWithEmailPass({ email, password }))
    }

    const onGoogleSignIn = () => {
        dispatch(startGoogleSignIn())
    }

    return (
        <div id='login'>
            <div id='login-d1' >
                <div className='logo'>exam<p className='logo-x'>X</p></div>
                <img src="../../public/images/working-man.png" alt="iniciar-sesion-imagen" />
            </div>

            <div id='login-d2'>
                <p id='login-d2-title'>Iniciar sesión</p>
                <form onSubmit={onSubmit}>
                    <input
                        type="email"
                        placeholder='Correo'
                        name='email'
                        value={email}
                        onChange={onInputChange}
                    />
                    <input
                        type="password"
                        placeholder='Contraseña'
                        name='password'
                        value={password}
                        onChange={onInputChange}
                    />

                    {
                        (errorMessage) 
                        ? ( <div className="auth-error-msg animate__animated animate__fadeIn"><BiErrorAlt className='auth-error-icon' />{errorMessage}</div>)
                        : ''
                    }

                    {/* =======Boton login========= */}
                    <button
                        className='auth-btn'
                        type="submit"
                        name='password'
                    >
                        Entrar
                    </button>
                </form>


                {/*===Boton registrarse con GOOGLE===*/}
                <button
                    className='auth-btn'
                    onClick={onGoogleSignIn}
                >
                    <FcGoogle className='googleicon' />Inicia sesión con Google
                </button>

                {/*======== Boton registrate========== */}
                <button className='auth-btn' onClick={() => navigate("/auth/register")}>Regístrate</button>

                <p id='login-d2-forg'>¿Olvidaste tu contraseña? <br /> Haz clic <a href="#">aquí</a></p>
            </div>
        </div>
    )
}
