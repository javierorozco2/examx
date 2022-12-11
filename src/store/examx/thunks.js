import { onEditExam, onEditExamDisable, setExams, setImageToDesc, setImageToResp, setLoading, setNoLoading, setPublished, setuid } from "./examxSlices"
import { collection, doc, getDocs, setDoc } from "firebase/firestore/lite"
import { FirebaseDB, storage } from "../../firebase/config"
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"
import { v4 } from "uuid"

export const publishExam = () => {
    return async (dispatch, getState) => {
        dispatch(setLoading())

        const { uid } = getState().auth
        dispatch(setuid({uid}))
        dispatch(setPublished())

        const { examActiveEdit } = getState().examx

        const docRef = doc(collection(FirebaseDB, `examfrompage/examx/exam`))
        await setDoc(docRef, examActiveEdit)

        dispatch(onEditExamDisable())
        dispatch(setNoLoading())
    }
}

export const startUploadingFiles = ({ file = [], secid, questId, respId }) => {
    return async (dispatch, getState) => {

        dispatch(setLoading())

        const storageRef = ref(storage, 'images/' + v4())

        if (!(file.type.includes('image'))) {
            dispatch(setNoLoading())
            throw new Error('El archivo no es una imagen')
            return
        }


        try {
            await uploadBytes(storageRef, file)
            const url = await (getDownloadURL(storageRef))

            dispatch(setImageToResp({ secid, questId, respId, url }))

        } catch (error) {
            console.log(error);
        }

        dispatch(setNoLoading())
    }

}

export const addDescImg = ({ file = [], secid }) => {
    return async (dispatch, getState) => { 
        dispatch(setLoading())

        const storageRef = ref(storage, 'images/' + v4())

        if (!(file.type.includes('image'))) {
            dispatch(setNoLoading())
            throw new Error('El archivo no es una imagen')
            return
        }


        try {
            await uploadBytes(storageRef, file)
            const url = await (getDownloadURL(storageRef))

            dispatch(setImageToDesc({ secid, url }))

        } catch (error) {
            console.log(error);
        }

        dispatch(setNoLoading())
    }
}

export const startLoadingExams = () => {
    return async(dispatch, getState) => {
        const { uid } = getState().auth

        if(!uid) throw new Error("No se encontro el uid")

        const collectionRef = collection(FirebaseDB, `examfrompage/examx/exam`)

        const docs = await getDocs(collectionRef)

        const exams = []
        docs.forEach( doc => {
            if( doc.data().uid === uid ){
                exams.push(doc.data())
            }
        })

        dispatch(setExams(exams))


    }
}