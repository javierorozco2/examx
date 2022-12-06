import { onEditExam, onEditExamDisable, setLoading, setNoLoading } from "./examxSlices"
import { collection, doc, setDoc } from "firebase/firestore/lite"
import { FirebaseDB } from "../../firebase/config"

export const publishExam = () => {
    return async(dispatch, getState) => {
        dispatch(setLoading())

        const { examActiveEdit } = getState().examx

        console.log(examActiveEdit);

        const docRef = doc( collection(FirebaseDB, `examfrompage/examx/exam`))
        await setDoc( docRef, examActiveEdit )

        dispatch( onEditExamDisable())
        dispatch(setNoLoading())
    }
}

// export const getExams = () => {
//     return async(dispatch,getSate) =>{
        
//     }
// }