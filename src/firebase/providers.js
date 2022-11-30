import {  GoogleAuthProvider, signInWithPopup} from "firebase/auth";
import { FirebaseAuth } from "./config";

const googleProvider = new GoogleAuthProvider()

export const signInWithGoogle = async () => {

    try {
        const result = await signInWithPopup(FirebaseAuth, googleProvider)
        // const credentials = GoogleAuthProvider.credentialFromResult(result)
        const { displayName, email, photoURL, uid } = result.user

        return{
            ok: true,
            displayName, email, photoURL, uid
        }

    } catch (error) {
        console.log("Ocurrio un error:", error);
        return{
            ok: false,
            errorMessage: error.message
        }
    }
}

export const logoutFirebase = async() => {

    return await FirebaseAuth.signOut()
    
}
