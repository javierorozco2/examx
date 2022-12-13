import { BsFillBookmarksFill, BsClock } from "react-icons/bs"
import { BiSave } from "react-icons/bi"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { useState } from "react"
import { validateMyExam } from "../../helpers/validateMyExam"
import { AiOutlineClose } from "react-icons/ai"
import { clearExamSelected } from "../../../store/examx/examxSlices"

export const Overview = () => {

    const boolexam = validateMyExam()
    
    const { myExamSelected } = useSelector( state => state.examx )
    const dispatch = useDispatch()

    // ==========Convetir fecha formato local==============
    const dateString = () => {
        const newDate = new Date( myExamSelected.createdAt )
        return newDate.toLocaleDateString('en-GB')
    }

    // =========Obtener la cantidad de preguntas===========
    const getAmountOfQst = () => {

        let count = 0
        myExamSelected.sections.map( i => {
            i.quest.map( e => {
                count += 1
            } )
        })

        return count
    }


    if ( Object.keys(myExamSelected).length === 0)  {
        return(
            <div className="main-ovw">

            {/* -----------------Titulo-------------------- */}
            <div className="ovw-title">
                <BsFillBookmarksFill className="ovw-titleicon-o"/>
                <p>No hay nada pp</p>
            </div>
        </div>
        )
    }

    return (
        <div className={"main-ovw " + (boolexam && 'animate__animated animate__zoomIn')}>

            {/* -----------------Titulo-------------------- */}
            <div className="ovw-title">
                <div>                    
                    <BsFillBookmarksFill className="ovw-titleicon-o"/>
                    <p>{myExamSelected.title}</p>
                </div>

                {
                    boolexam &&
                    <button className="ovw-xbotton" onClick={() => dispatch(clearExamSelected())}>
                        <AiOutlineClose/>
                    </button>
                }

            </div>

            {/*------ fecha de publicación y guardados -----*/}
            <div className="ovw-info">
                <p><BsClock className="ovw-icon"/>{dateString()}</p>
                <p><BiSave className="ovw-icon"/> { getAmountOfQst() } </p>
            </div>

            {/*----------- cantidad de preguntas ---------- */}
            <div className="ovw-desc">
                <div>24 preguntas</div>
            </div>

            {/* -----------------descripción--------------- */}
            <div className="ovw-desc">
                <div>{myExamSelected.desc}</div>
            </div>

            {/* ----------------boton guardar-------------- */}
            <button className="ovw-button">
                Guardar examen
            </button>

        </div>
    )
}
