import { onEditExam, setLoading, setNoLoading } from "./examxSlices"
import { collection, doc, setDoc } from "firebase/firestore/lite"
import { FirebaseDB } from "../../firebase/config"
import { useNavigate } from "react-router-dom"

export const publishExam = () => {
    return async(dispatch, getState) => {
        dispatch(setLoading())

        const { uid } = getState().auth
        const { examActiveEdit } = getState().examx

        console.log(examActiveEdit);

        const docRef = doc( collection(FirebaseDB, `examfrompage/examx/exam`))
        await setDoc( docRef, examActiveEdit )

        dispatch(setNoLoading())
        dispatch( onEditExam(true))
    }
}