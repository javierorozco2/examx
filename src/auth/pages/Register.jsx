import React, { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FcGoogle } from "react-icons/fc"
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from '../../hooks/useForm'
import { startGoogleSignIn } from '../../store/auth/thunks'

const formData = { //Data de formularios
    email: '',
    displayName: '',
    password: '',
    passwordr: '',
}

const formValidations = { //Validaciones para mandar a hook

}

export const Register = () => {

    const dispatch = useDispatch()  //usar funciones de Redux
    const { status, errorMessage } = useSelector( state => state.auth) // Obtener status actual y error
    const isCheckingAuthentication = useMemo( () => status === 'checking', [status]) //Boleano para bloquear botones

    const navigate = useNavigate()

    const { formState, displayName, email, password,  passwordr,  onInputChange,
        isFormValid, displayNameValid, emailValid, passwordValid, passwordrValid  } = useForm(formData, formValidations)

    const onSubmit = (e) => {
        e.preventDefault()

        // Se envian los datos para validar la sesion
    }

    const onGoogleSignIn = () => {
        console.log('Google');
        dispatch(startGoogleSignIn())
    }

    return (
        <div id='login'>
            <div id='login-d1' >
                <div className='logo'>exam<p className='logo-x'>X</p></div>
                <img src="../../public/images/personal-settings.png" alt="iniciar-sesion-imagen" />
            </div>

            <div id='login-d2'>
                <p id='login-d2-title'>Regístrate</p>
                <form onSubmit={onSubmit}>
                    <input
                        type="text"
                        placeholder='Nombre'
                        name='displayName'
                        value={displayName}
                        onChange={onInputChange}
                    />
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
                    <input
                        type="password"
                        placeholder='Repetir contraseña'
                        name='passwordr'
                        value={passwordr}
                        onChange={onInputChange}
                    />
                </form>

                <button className='auth-btn' type="submit" onClick={() => navigate("/")}>Registrarse</button>
                <button className='auth-btn' onClick={onGoogleSignIn}>< FcGoogle className='googleicon'/>Registrate con Google</button>

                <p id='login-d2-forg'>¿Ya tienes cuenta? <br /> Inicia sesión <Link to="auth/login">aquí</Link></p>
            </div>
        </div>
    )
}
