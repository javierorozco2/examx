import React, { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FcGoogle } from "react-icons/fc"
import { BiErrorAlt } from "react-icons/bi"
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from '../../hooks/useForm'
import { startCreatingWithEmailPassword, startGoogleSignIn } from '../../store/auth/thunks'

const formData = { //Data de formularios
    email: '',
    displayName: '',
    password: '',
    passwordr: '',
}

const formValidations = { //Validaciones para mandar a hook
    displayName: [(value) => value.length >= 1, 'Es necesario ingresar un nombre'],
    password: [(value) => value.length >= 6, 'La contraseña debe de tener mas de 6 caracteres'],
    email: [(value) => value.includes('@'), 'El formato del correo es incorrecto']
}

export const Register = () => {

    const dispatch = useDispatch()  //usar funciones de Redux
    const [formSubmitted, setFormSubmitted] = useState(false)

    const { formState, displayName, email, password, onInputChange,
        isFormValid, displayNameValid, emailValid, passwordValid } = useForm(formData, formValidations)

    const onSubmit = (e) => {
        e.preventDefault()

        setFormSubmitted(true)

        if (!isFormValid) return

        dispatch( startCreatingWithEmailPassword(formState) )
    }

    const onGoogleSignIn = () => {
        dispatch(startGoogleSignIn())
    }

    return (
        <div id='login'>
            <div id='login-d1' >
                <div className='logo'>exam<p className='logo-x'>X</p></div>
                <img src="../../public/images/personal-settings.png" alt="iniciar-sesion-imagen" />
            </div>

            <div id='login-d2'>
                <div className='login-formcontainer animate__animated animate__fadeIn'>
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

                        {
                            formSubmitted && (
                                <>
                                    { displayNameValid && (<div className="auth-error-msg animate__animated animate__fadeIn"><BiErrorAlt className='auth-error-icon' />{displayNameValid}</div>) }
                                    { passwordValid && (<div className="auth-error-msg animate__animated animate__fadeIn"><BiErrorAlt className='auth-error-icon' />{passwordValid}</div>) }
                                    { emailValid && (<div className="auth-error-msg animate__animated animate__fadeIn"><BiErrorAlt className='auth-error-icon' />{emailValid}</div>) }
                                </>
                            )
                        }


                        <button className='auth-btn' type="submit">Registrarse</button>
                    </form>

                    <button className='auth-btn' onClick={onGoogleSignIn}>< FcGoogle className='googleicon' />Registrate con Google</button>

                    <p id='login-d2-forg'>¿Ya tienes cuenta? <br /> Inicia sesión <Link to="auth/login">aquí</Link></p>
                </div>
            </div>
        </div>
    )
}
