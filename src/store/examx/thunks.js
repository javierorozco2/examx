import { onEditExam, onEditExamDisable, setImageToDesc, setImageToResp, setLoading, setNoLoading, setPublished } from "./examxSlices"
import { collection, doc, setDoc } from "firebase/firestore/lite"
import { FirebaseDB, storage } from "../../firebase/config"
import { async } from "@firebase/util"
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"
import { v4 } from "uuid"

export const publishExam = () => {
    return async (dispatch, getState) => {
        dispatch(setLoading())

        const { examActiveEdit } = getState().examx

        const docRef = doc(collection(FirebaseDB, `examfrompage/examx/exam`))
        await setDoc(docRef, examActiveEdit)

        dispatch(onEditExamDisable())
        dispatch(setNoLoading())
        dispatch(setPublished())
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