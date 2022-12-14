import { useEffect } from "react"
import { useState } from "react"
import { useSelector } from "react-redux"

export const validateMyExam = () => {

    const { myExamSelected } = useSelector( state => state.examx )
    const [ItsMyExam, setItsMyExam] = useState(false)

    const { uid } = useSelector( state => state.auth)

    useEffect(() => {
        if (uid === myExamSelected.uid) {
            setItsMyExam(true)
            
        } else {
            setItsMyExam(false)
        }

    }, [myExamSelected])

    return ItsMyExam
}
