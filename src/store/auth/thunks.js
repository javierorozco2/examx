import { loginWithEmailPassword, logoutFirebase, registerUserWithEmailPassword, signInWithGoogle } from "../../firebase/providers"
import { checkingCredentials, login, logout } from "./authSlice"

export const checkingAuthentication = (email, password) => {
    return async( dispatch ) => {

        dispatch( checkingCredentials())

    }
}

export const startGoogleSignIn = () => {
    return async( dispatch ) => {

        dispatch( checkingCredentials())

        const result = await signInWithGoogle()

        if( !result.ok ) return dispatch( logout(result) )

        dispatch( login( result ) )
    }
}

export const startCreatingWithEmailPassword = ({ email, password, displayName}) => {
    return async( dispatch ) => {
        dispatch( checkingCredentials() )

        const { ok, uid, photoURL, errorMessage } = await registerUserWithEmailPassword({ email, password, displayName})

        if( !ok ) return dispatch(logout({errorMessage}))

        dispatch(login({uid, displayName, email, photoURL, errorMessage}))
    }
}

export const startLoginWithEmailPass = ({ email, password }) => {
    
    return async( dispatch ) => {

        dispatch( checkingCredentials() )

        const data = await loginWithEmailPassword({email, password})

        console.log(data);

        if ( !data.ok ) return dispatch( logout( data ))

        dispatch(login(data))
    }
}


export const startLogout = ( ) => {
    return async(dispatch) => {

        await logoutFirebase()

        dispatch(logout({}))
    }
}
